import * as fieldValidationHelper from "../../common/helpers/fieldValidationHelper";
import * as commonTypes from "../../common/typings/commonTypes";
import * as serverTypes from "../typings";
import * as googlePlacesService from "./locationService";
import * as stringHelper from "../../common/helpers/stringHelper";
import { socialLinks } from "../../common/data/socialLinks";
import { normalizeAllTags, processTagsForSearch } from "../helpers/tagHelper";
import { UserProfileStatus } from "../../common/typings";
import { deleteFile, getCvFileKeyForUser, uploadFile } from "./s3Service";
import { DeveloperSearchResult } from "../typings";
import { getDataFromFormattedAddress } from "../../common/helpers/locationFormatHelper";

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
        activated: user.status === UserProfileStatus.READY,
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
        bio: user.bio,
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
        settingsEnabled: user.settings_enabled,
        settingsSearchable: user.settings_searchable,
        cv: {
            fileName: user.cv_file_name,
            url: user.cv_url,
        },
    };
}

/**
 * Saves the profile of the given user
 */
export async function saveProfile(db: serverTypes.AboutDevsDatabase, userId: number, profile: commonTypes.UserProfile, cv: Express.Multer.File): Promise<commonTypes.UserProfile> {
    let user = await db.user.findOne({id: userId});
    if (!user) throw Error("could not find user");

    user.last_updated_at = new Date();
    user.name = profile.name ? profile.name.toLowerCase() : profile.name;
    user.display_name = profile.displayName;
    user.title = profile.title;
    user.type = profile.type;
    user.bio = profile.bio || "";
    user.colors = profile.colors;
    user.company_name = profile.companyName;
    user.company_url = profile.companyUrl;
    user.settings_enabled = profile.settingsEnabled;
    user.settings_searchable = profile.settingsSearchable;
    user.social_links = {
        socialLinks: profile.socialLinks,
    };
    user.info_groups = {
        infoGroups: profile.infoGroups,
    };

    const {placeId} = getDataFromFormattedAddress(profile.formattedAddress);
    const city = await googlePlacesService.getAndSaveLocation(db, placeId);
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

    try {
        // save CV to S3
        if (cv && cv.size <= 500000) {
            // cv will be truthy if it has to be updated
            const s3FileKey = getCvFileKeyForUser(user.id);
            const s3SaveResult = await uploadFile(s3FileKey, cv.buffer);
            user.cv_file_name = profile.cv.fileName;
            user.cv_url = s3SaveResult.Location;
            await await db.user.save(user);
        } else if (!profile.cv.fileName && user.cv_file_name) {
            // in this case the user removing the file
            const s3FileKey = getCvFileKeyForUser(user.id);
            user.cv_file_name = null;
            user.cv_url = null;
            await await db.user.save(user);
            await deleteFile(s3FileKey);
        }
    } catch (ex) {
        // log this
    }

    return getUserProfile(db, user);
}

/**
 * Searches developers
 */
export async function searchDevelopers(db: serverTypes.AboutDevsDatabase, tags: string = null, googlePlaceId: string = null): Promise<commonTypes.DeveloperSearchProfile[]> {
    // This is a temporary hack. Search results will bring 80 developers until paging is properly sorted
    const staticPage = 2;

    let searchResult: DeveloperSearchResult[] = null;
    const tagsNormalized = processTagsForSearch(tags);

    if (tags && googlePlaceId) {
        // find the place
        const place = await db.google_place.findOne({google_place_id: googlePlaceId});
        if (!place) {
            return Promise.resolve([]);
        }
        const {longitude, latitude} = place;
        searchResult = await db._aboutdevs_search_developers(tagsNormalized, longitude, latitude, staticPage);
    } else if (tags) {
        searchResult = await db._aboutdevs_search_developers_anywhere(tagsNormalized, staticPage);
    } else {
        searchResult = await db._aboutdevs_discover_developers(staticPage);
    }

    return searchResult.map((d) => ({
        name: d.name,
        displayName: d.display_name,
        photoUrl: d.photo_url,
        title: d.title,
        companyName: d.company_name,
        formattedAddress: d.google_place_formatted_address,
        tags: d.tags ? d.tags.split(" ") : [],
    }));
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

    const errors = fieldValidationHelper.validateUserProfile(updatedProfile);

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

export async function getUserByName(db: serverTypes.AboutDevsDatabase, userName: string, loggedUserId: number) {
    if (!userName) return null;
    const lowercaseUserName = userName.toLowerCase();
    const user = await db.user.findOne({name: lowercaseUserName});
    if (!user) return null;
    const loggedUserIsUserBeingAsked = loggedUserId ? user.id === loggedUserId : false;
    if (!loggedUserIsUserBeingAsked) {
        return (user.status === UserProfileStatus.READY && user.settings_enabled) ? user : null;
    }
    return user;
}
