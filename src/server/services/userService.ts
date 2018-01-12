import * as fieldValidationHelper from "../../common/helpers/fieldValidationHelper";
import * as commonTypes from "../../common/typings/commonTypes";
import * as serverTypes from "../typings";
import * as googlePlacesService from "./googlePlacesService";
import * as stringHelper from "../../common/helpers/stringHelper";
import { socialLinks } from "../../common/data/socialLinks";
import { normalizeAllTags } from "../helpers/tagHelper";

/**
 * Extracts the user name from the user's e-mail
 */
export function extractUserNameFromEmail(email: string) {
    if (email === null || email === undefined) throw Error("Argument 'email' should be null or undefined");
    const atPosition = email.indexOf("@");
    return email.substring(0, atPosition);
}

/**
 * Returns a suggested user name given the user e-mail
 */
export async function getValidUserName(db: serverTypes.AboutDevsDatabase, userName: string) {
    if (db === null || db === undefined) throw Error("Argument 'db' should be null or undefined");
    if (userName === null || userName === undefined) throw Error("Argument 'email' should be null or undefined");

    const user = await db.user.findOne({name: userName});
    if (!user) {
        return userName;
    }

    const existingUsers = await db.user.find({"name ilike": `${userName}%`});
    if (existingUsers.length === 0) return userName;

    const lowerCaseUserNames = existingUsers.map((s) => s.name.toLowerCase());
    let finalUserName = userName.toLowerCase();
    while (lowerCaseUserNames.indexOf(finalUserName) !== -1) {
        finalUserName = stringHelper.incrementLast(finalUserName, true);
    }
    return finalUserName;
}

export function getReduxDataForLoggedUser(user: serverTypes.User): commonTypes.CurrentUserProfile {
    if (user === null || user === undefined) throw Error("Argument 'user' should be null or undefined");
    return {
        id: user.id,
        name: user.name,
        displayName: user.display_name,
        photoUrl: user.photo_url,
    };
}

export async function getUserProfile(db: serverTypes.AboutDevsDatabase, user: serverTypes.User): Promise<commonTypes.UserProfile> {
    if (!db) throw Error("Argument 'db' should be truthy");
    if (!user) throw Error("Argument 'user' should be truthy");

    return {
        id: user.id,
        name: user.name,
        title: user.title,
        email: user.email,
        displayName: user.display_name,
        photoUrl: user.photo_url,
        type: user.type,
        status: user.status,
        formattedAddress: user.google_place_formatted_address,
        bio: {text: user.bio},
        socialLinks: user.social_links
            ? user.social_links.socialLinks
            : null,
        infoGroups: user.info_groups
            ? user.info_groups.infoGroups
            : null,
        tags: user.tags ? user.tags.split(" ") : [],
        colors: user.colors,
        companyName: user.company_name,
        companyUrl: user.company_url,
    };
}

/**
 * Saves the profile of the given user
 * @param db The massive object
 * @param userId The user id. This id must really exist
 * @param profile The user profile
 */
export async function saveProfile(db: serverTypes.AboutDevsDatabase, userId: number, profile: commonTypes.UserProfile): Promise<commonTypes.UserProfile> {
    let user = await db.user.findOne({id: userId});
    if (!user) throw Error("could not find user");

    user.last_updated_at = new Date();
    user.name = profile.name;
    user.display_name = profile.displayName;
    user.title = profile.title;
    user.type = profile.type;
    user.bio = profile.bio ? profile.bio.text : "";
    user.colors = profile.colors;
    user.company_name = profile.companyName;
    user.company_url = profile.companyUrl;
    user.social_links = {
        socialLinks: profile.socialLinks,
    };
    user.info_groups = {
        infoGroups: profile.infoGroups,
    };

    const city = await googlePlacesService.getAndSaveCity(db, profile.formattedAddress);
    if (city) {
        user.google_place_id = city.id;
        user.google_place_formatted_address = city.formatted_address;
        user.latitude = city.latitude;
        user.longitude = city.longitude;
    }

    // tags
    const profileTags = profile.tags || [];
    const persistedTags = await db._aboutdevs_select_tags_from_user(userId);
    // add tags that were added

    const addedTags =
        (profileTags && profileTags.length)
            ? profileTags.filter((profileTag) =>
            persistedTags.findIndex((persistedTag) => persistedTag.name === profileTag) === -1)
            : [];

    for (const addedTag of addedTags) {
        // get persisted version of the tag
        const persistedTag = await db.tag.findOne({name: addedTag});
        if (persistedTag) {
            const persistedUserTag = await db.user_tag.findOne({user_id: user.id, tag_id: persistedTag.id});
            // now persistedUserTag should be null, because if the tag is being added, it shouldn't exist
            if (!persistedUserTag) {
                await db.user_tag.insert({user_id: user.id, tag_id: persistedTag.id});
            }
        }
        // in case persistedTag is falsy here, this means the user is probably trying to inject a tag
    }
    // remove tags that were removed
    const removedTags = persistedTags
        .filter((dbTag) => profileTags.findIndex((profileTag) => profileTag === dbTag.name) === -1);
    for (const removedTag of removedTags) {
        const persistedUserTag = await db.user_tag.findOne({user_id: user.id, tag_id: removedTag.id});
        if (persistedUserTag) {
            await db.user_tag.destroy({id: persistedUserTag.id});
        }
    }

    // This is for redundance
    user.tags = profileTags.join(" ");
    user.tags_normalized = normalizeAllTags(profileTags);

    user = (await db.user.update(user)) as serverTypes.User;

    // change status
    if (user.status === commonTypes.UserProfileStatus.PENDING_PROFILE_ACTIVATION) {
        user.status = commonTypes.UserProfileStatus.READY;
        user = (await db.user.save(user)) as serverTypes.User;
    }

    // update geometry
    if (city) {
        await db._aboutdevs_user_update_geometry(user.id, user.longitude, user.latitude);
    }

    return getUserProfile(db, user);
}

/**
 * Searches developers
 */
export async function searchDevelopers(db: serverTypes.AboutDevsDatabase, tags: string[], location: string): Promise<commonTypes.DeveloperSearchProfile[]> {
    // we need to convert the location to latitude and longitude
    const locations = await googlePlacesService.searchCities(db, location);
    if (!locations.results.length) {
        return [];
    }
    const googleApiResult = locations.results[0];
    const {lat, lng} = googleApiResult.geometry.location;
    const result: commonTypes.DeveloperSearchProfile[] = [];
    const dbDevelopers = await db._aboutdevs_search_developers(tags, lng, lat, 1);

    for (const dbDeveloper of dbDevelopers) {
        const user: commonTypes.DeveloperSearchProfile = {
            id: dbDeveloper.id,
            name: dbDeveloper.name,
            displayName: dbDeveloper.display_name,
            photoUrl: dbDeveloper.photo_url,
            distance: dbDeveloper.distance,
            title: dbDeveloper.profession_other,
            tags: await db._aboutdevs_select_tags_from_user(dbDeveloper.id),
        };
        result.push(user);
    }
    return result;
}

/**
 * Returns an object with a key for each property that has an error on it. The value is the error key
 * @param db The database
 * @param profile The profile being validated
 */
export async function validateProfile(db: serverTypes.AboutDevsDatabase, profile: commonTypes.UserProfile) {
    const updatedProfile = {
        name: "",
        type: 0,
        displayName: "",
        title: "",
        bio: {text: ""},
        address: "",
        ...profile,
    };

    const errors = fieldValidationHelper.validate(updatedProfile);

    // validate social links
    if (profile.socialLinks) {
        if (!(profile.socialLinks instanceof Array) || profile.socialLinks.filter((psl) => !socialLinks.find((sl) => sl.value === psl.website)).length) {
            errors.socialLinks = fieldValidationHelper.INCOMPLETE_SOCIAL_LINK;
        }
    }

    const userNameTaken = (await db._aboutdevs_is_user_name_taken(updatedProfile.name, updatedProfile.id))[0];
    if (userNameTaken.exists) {
        errors.name = fieldValidationHelper.USER_NAME_IS_TAKEN;
    }
    return errors;
}
