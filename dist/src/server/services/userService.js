"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fieldValidationHelper = require("../../common/helpers/fieldValidationHelper");
const commonTypes = require("../../common/typings/commonTypes");
const googlePlacesService = require("./googlePlacesService");
const stringHelper = require("../../common/helpers/stringHelper");
const socialLinks_1 = require("../../common/data/socialLinks");
const tagHelper_1 = require("../helpers/tagHelper");
/**
 * Extracts the user name from the user's e-mail
 */
function extractUserNameFromEmail(email) {
    if (email === null || email === undefined)
        throw Error("Argument 'email' should be null or undefined");
    const atPosition = email.indexOf("@");
    return email.substring(0, atPosition);
}
exports.extractUserNameFromEmail = extractUserNameFromEmail;
/**
 * Returns a suggested user name given the user e-mail
 */
function getValidUserName(db, userName) {
    return __awaiter(this, void 0, void 0, function* () {
        if (db === null || db === undefined)
            throw Error("Argument 'db' should be null or undefined");
        if (userName === null || userName === undefined)
            throw Error("Argument 'email' should be null or undefined");
        const user = yield db.user.findOne({ name: userName });
        if (!user) {
            return userName;
        }
        const existingUsers = yield db.user.find({ "name ilike": `${userName}%` });
        if (existingUsers.length === 0)
            return userName;
        const lowerCaseUserNames = existingUsers.map((s) => s.name.toLowerCase());
        let finalUserName = userName.toLowerCase();
        while (lowerCaseUserNames.indexOf(finalUserName) !== -1) {
            finalUserName = stringHelper.incrementLast(finalUserName, true);
        }
        return finalUserName;
    });
}
exports.getValidUserName = getValidUserName;
function getReduxDataForLoggedUser(user) {
    if (user === null || user === undefined)
        throw Error("Argument 'user' should be null or undefined");
    return {
        id: user.id,
        name: user.name,
        displayName: user.display_name,
        photoUrl: user.photo_url,
    };
}
exports.getReduxDataForLoggedUser = getReduxDataForLoggedUser;
function getUserProfile(db, user) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!db)
            throw Error("Argument 'db' should be truthy");
        if (!user)
            throw Error("Argument 'user' should be truthy");
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
            bio: { text: user.bio },
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
    });
}
exports.getUserProfile = getUserProfile;
/**
 * Saves the profile of the given user
 * @param db The massive object
 * @param userId The user id. This id must really exist
 * @param profile The user profile
 */
function saveProfile(db, userId, profile) {
    return __awaiter(this, void 0, void 0, function* () {
        let user = yield db.user.findOne({ id: userId });
        if (!user)
            throw Error("could not find user");
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
        const city = yield googlePlacesService.getAndSaveCity(db, profile.formattedAddress);
        if (city) {
            user.google_place_id = city.id;
            user.google_place_formatted_address = city.formatted_address;
            user.latitude = city.latitude;
            user.longitude = city.longitude;
        }
        // tags
        const profileTags = profile.tags || [];
        const persistedTags = yield db._aboutdevs_select_tags_from_user(userId);
        // add tags that were added
        const addedTags = (profileTags && profileTags.length)
            ? profileTags.filter((profileTag) => persistedTags.findIndex((persistedTag) => persistedTag.name === profileTag) === -1)
            : [];
        for (const addedTag of addedTags) {
            // get persisted version of the tag
            const persistedTag = yield db.tag.findOne({ name: addedTag });
            if (persistedTag) {
                const persistedUserTag = yield db.user_tag.findOne({ user_id: user.id, tag_id: persistedTag.id });
                // now persistedUserTag should be null, because if the tag is being added, it shouldn't exist
                if (!persistedUserTag) {
                    yield db.user_tag.insert({ user_id: user.id, tag_id: persistedTag.id });
                }
            }
            // in case persistedTag is falsy here, this means the user is probably trying to inject a tag
        }
        // remove tags that were removed
        const removedTags = persistedTags
            .filter((dbTag) => profileTags.findIndex((profileTag) => profileTag === dbTag.name) === -1);
        for (const removedTag of removedTags) {
            const persistedUserTag = yield db.user_tag.findOne({ user_id: user.id, tag_id: removedTag.id });
            if (persistedUserTag) {
                yield db.user_tag.destroy({ id: persistedUserTag.id });
            }
        }
        // This is for redundance
        user.tags = profileTags.join(" ");
        user.tags_normalized = tagHelper_1.normalizeAllTags(profileTags);
        user = (yield db.user.update(user));
        // change status
        if (user.status === commonTypes.UserProfileStatus.PENDING_PROFILE_ACTIVATION) {
            user.status = commonTypes.UserProfileStatus.READY;
            user = (yield db.user.save(user));
        }
        // update geometry
        if (city) {
            yield db._aboutdevs_user_update_geometry(user.id, user.longitude, user.latitude);
        }
        return getUserProfile(db, user);
    });
}
exports.saveProfile = saveProfile;
/**
 * Searches developers
 */
function searchDevelopers(db, tags, googlePlaceId, page) {
    return __awaiter(this, void 0, void 0, function* () {
        page = page > 10 ? 10 : page;
        // find the place
        const place = yield db.google_place.findOne({ google_place_id: googlePlaceId });
        if (!place) {
            throw Error(`Place not found. Place id: ${googlePlaceId}`);
        }
        const { longitude, latitude } = place;
        const tagsNormalized = tagHelper_1.processTagsForSearch(tags);
        const searchResult = yield db._aboutdevs_search_developers(tagsNormalized, longitude, latitude, page);
        return searchResult.map((d) => ({
            name: d.name,
            displayName: d.display_name,
            photoUrl: d.photo_url,
            title: d.title,
            companyName: d.company_name,
            formattedAddress: d.google_place_formatted_address,
            tags: d.tags ? d.tags.split(" ") : [],
        }));
    });
}
exports.searchDevelopers = searchDevelopers;
/**
 * Returns an object with a key for each property that has an error on it. The value is the error key
 * @param db The database
 * @param profile The profile being validated
 */
function validateProfile(db, profile) {
    return __awaiter(this, void 0, void 0, function* () {
        const updatedProfile = Object.assign({ name: "", type: 0, displayName: "", title: "", bio: { text: "" }, address: "" }, profile);
        const errors = fieldValidationHelper.validate(updatedProfile);
        // validate social links
        if (profile.socialLinks) {
            if (!(profile.socialLinks instanceof Array) || profile.socialLinks.filter((psl) => !socialLinks_1.socialLinks.find((sl) => sl.value === psl.website)).length) {
                errors.socialLinks = fieldValidationHelper.INCOMPLETE_SOCIAL_LINK;
            }
        }
        const userNameTaken = (yield db._aboutdevs_is_user_name_taken(updatedProfile.name, updatedProfile.id))[0];
        if (userNameTaken.exists) {
            errors.name = fieldValidationHelper.USER_NAME_IS_TAKEN;
        }
        return errors;
    });
}
exports.validateProfile = validateProfile;
//# sourceMappingURL=userService.js.map