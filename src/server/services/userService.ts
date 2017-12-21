import * as fieldValidationHelper from "../../common/helpers/fieldValidationHelper";
import * as commonTypes from "../../common/typings/commonTypes";
import * as serverTypes from "../typings";
import * as locationService from "../services/locationService";
import * as stringHelper from "../../common/helpers/stringHelper";
import { socialLinks } from "../../common/data/socialLinks";

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

async function getTagsForUser(db: serverTypes.AboutDevsDatabase, userId: number): Promise<commonTypes.UserTag[]> {
    return db._aboutdevs_select_tags_from_user(userId);
}

export async function getUserProfileFromUser(db: serverTypes.AboutDevsDatabase, user: serverTypes.User, currentUserId: number, operation: commonTypes.Operation): Promise<commonTypes.UserProfile> {
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
        address: await (user.geo_location_id ? locationService.getFormattedLocationById(db, user.geo_location_id) : null),
        bio: user.bio,
        socialLinks: user.social_links,
        tags: await getTagsForUser(db, user.id),
        colorPrimary: user.color_primary,
        colorSecondary: user.color_secondary,
        colorNegative: user.color_negative,
        companyName: user.company_name,
        companyUrl: user.company_url,
    };
}

/**
 * Gets the profile of the given user
 * @param db The massive object
 * @param userId The id of the user
 * @param currentUserId
 * @param operation
 */
export async function getUserProfileById(db: serverTypes.AboutDevsDatabase, userId: number, currentUserId: number, operation: commonTypes.Operation): Promise<commonTypes.UserProfile> {
    const user = await db.user.findOne({id: userId});
    return getUserProfileFromUser(db, user, currentUserId, operation);
}

/**
 * Saves the profile of the given user
 * @param db The massive object
 * @param userId The user id. This id must really exist
 * @param profile The user profile
 * @param professionId The title id. This is for testing only. In production, this variable cannot contain value
 * @param locationId The location id. This is for testing only. In production, this variable cannot contain value
 */
export async function saveProfile(db: serverTypes.AboutDevsDatabase, userId: number, profile: commonTypes.UserProfile, professionId?: number, locationId?: number): Promise<commonTypes.UserProfile> {
    let user = await db.user.findOne({id: userId});
    if (!user) throw Error("could not find user");

    user.name = profile.name;
    user.display_name = profile.displayName;
    user.title = profile.title;
    user.type = profile.type;
    user.bio = profile.bio;
    user.color_primary = profile.colorPrimary;
    user.color_secondary = profile.colorSecondary;
    user.color_negative = profile.colorNegative;
    user.company_name = profile.companyName;
    user.company_url = profile.companyUrl;
    user.social_links = profile.socialLinks;

    // location
    // TODO: Add location redundancy to the user type
    if (!locationId) {
        const location = await locationService.saveAddress(db, profile.address);
        user.geo_location_id = location.id;
    } else {
        if (process.env.NODE_ENV === "production") {
            throw Error("Passing location id is a not enabled in production");
        }
        user.geo_location_id = locationId;
    }

    // tags
    if (profile.type === commonTypes.UserProfileType.DEVELOPER) {
        const profileTags = profile.tags;
        const persistedTags = await db._aboutdevs_select_tags_from_user(userId);
        // add tags that were added

        const addedTags =
            (profileTags && profileTags.length)
                ? profileTags.filter((profileTag) =>
                persistedTags.findIndex((persistedTag) => persistedTag.name === profileTag.name) === -1)
                : [];

        for (const addedTag of addedTags) {
            await db.user_tag.insert({name: addedTag.name});
        }
        // remove tags that were removed
        const removedTags = persistedTags
            .filter((dbTag) => profileTags.findIndex((profileTag) => profileTag.id === dbTag.id) === -1);
        for (const removedTag of removedTags) {
            await db.user_tag.destroy({id: removedTag.id});
        }
    }

    user = (await db.user.update(user)) as serverTypes.User;

    // change status
    if (user.status === commonTypes.UserProfileStatus.PENDING_PROFILE_ACTIVATION) {
        user.status = commonTypes.UserProfileStatus.READY;
        user = (await db.user.save(user)) as serverTypes.User;
    }

    return getUserProfileFromUser(db, user, user.id, commonTypes.Operation.EDIT);
}

/**
 * Searches developers
 */
export async function searchDevelopers(db: serverTypes.AboutDevsDatabase, tags: string[], location: string): Promise<commonTypes.DeveloperSearchProfile[]> {
    // we need to convert the location to latitude and longitude
    const locations = await locationService.searchLocations(db, location);
    if (!locations.results.length) {
        return [];
    }
    const googleApiResult = locations.results[0];
    const {lat, lng} = googleApiResult.geometry.location;
    const result: commonTypes.DeveloperSearchProfile[] = [];
    const dbDevelopers = await db._aboutdevs_search_developers(tags, lng, lat);

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
        bio: "",
        address: "",
        ...profile,
    };

    const errors = fieldValidationHelper.validate(updatedProfile);

    // validate social links
    if (profile.socialLinks) {
        if (!(profile.socialLinks instanceof Array)
            || profile.socialLinks.filter((psl) => socialLinks.find((sl) => sl.value === psl.website)).length) {
            errors.socialLinks = fieldValidationHelper.INCOMPLETE_SOCIAL_LINK;
        }
    }

    const userNameTaken = (await db._aboutdevs_is_user_name_taken(updatedProfile.name, updatedProfile.id))[0];
    if (userNameTaken.exists) {
        errors.name = fieldValidationHelper.USER_NAME_IS_TAKEN;
    }
    return errors;
}
