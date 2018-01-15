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
const objectHelpers_1 = require("../../common/helpers/objectHelpers");
const userService_1 = require("./userService");
const gravatarHelper_1 = require("../helpers/gravatarHelper");
const googlePlacesService_1 = require("./googlePlacesService");
const typings_1 = require("../../common/typings");
const faker = require("faker");
/**
 * Creates a user object from an OAuth Google profile
 * @param db Massive instance
 * @param profile
 * @returns Promise
 */
function createFromLinkedInProfile(db, profile) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!db)
            throw Error("'db' should be truthy");
        if (!profile)
            throw Error("'profile' should be truthy");
        const email = profile.emailAddress;
        const photoUrl = gravatarHelper_1.getGravatarImageFromEmail(email, gravatarHelper_1.GravatarSize.medium);
        const userName = yield userService_1.getValidUserName(db, userService_1.extractUserNameFromEmail(email));
        const user = {
            bio: faker.lorem.paragraphs(3, "\n\n"),
            status: typings_1.UserProfileStatus.PENDING_PROFILE_ACTIVATION,
            type: typings_1.UserProfileType.DEVELOPER,
            display_name: profile.formattedName,
            email,
            name: userName,
            title: profile.headline,
            oauth_profiles: {
                linkedin: {
                    id: profile.id,
                    raw: profile,
                },
            },
            social_links: {
                socialLinks: [{
                        website: "linkedin",
                        url: profile.publicProfileUrl,
                    }],
            },
            info_groups: null,
            photo_url: photoUrl,
            colors: {
                headerBackground: "#252934",
                headerText: "#FFFFFF",
                bodyBackground: "#3073b5",
                bodyText: "#FFFFFF",
            },
            tags: "",
            tags_normalized: "",
        };
        let userLocation = profile.location.name;
        if (userLocation) {
            userLocation = userLocation.replace(" Area", "");
            const citiesFormatted = yield googlePlacesService_1.searchCitiesFormatted(db, userLocation);
            if (citiesFormatted && citiesFormatted.length) {
                const googlePlace = yield googlePlacesService_1.getAndSaveCity(db, citiesFormatted[0]);
                user.google_place_id = googlePlace.id;
                user.google_place_formatted_address = googlePlace.formatted_address;
            }
        }
        return (yield db.user.insert(user));
    });
}
exports.createFromLinkedInProfile = createFromLinkedInProfile;
/**
 * Updates a user object based on the given google profile
 * @param db Massive instance
 * @param existingUser
 * @param profile
 */
function updateFromLinkedInProfile(db, existingUser, profile) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!db)
            throw Error("'db' should be truthy");
        if (!existingUser)
            throw Error("'existingUser' should be truthy");
        if (!profile)
            throw Error("'profile' should be truthy");
        if (!existingUser.display_name) {
            existingUser.display_name = profile.formattedName;
        }
        if (!existingUser.photo_url) {
            const email = profile.emailAddress;
            existingUser.photo_url = gravatarHelper_1.getGravatarImageFromEmail(email, gravatarHelper_1.GravatarSize.medium);
        }
        if (!existingUser.oauth_profiles) {
            existingUser.oauth_profiles = {
                linkedin: {
                    id: profile.id,
                    raw: profile,
                },
            };
        }
        if (!existingUser.oauth_profiles.linkedin) {
            existingUser.oauth_profiles.linkedin = {
                id: profile.id,
                raw: profile,
            };
        }
        return (yield db.user.save(existingUser));
    });
}
exports.updateFromLinkedInProfile = updateFromLinkedInProfile;
/**
 * Finds the user based on the given google profile or creates a new user and returns that user
 * @param db
 * @param profile
 * @returns {Promise}
 */
function findOrCreateFromLinkedInProfile(db, profile) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!db)
            throw Error("'db' should be truthy");
        if (!profile)
            throw Error("'profile' should be truthy");
        const user = yield db.user.findOne({ email: profile.emailAddress });
        if (!user) {
            return createFromLinkedInProfile(db, profile);
        }
        // if the existing user is associated with LinkedIn already
        const existingUserLinkedInId = objectHelpers_1.safeRead((u) => u.oauth_profiles.linkedin.id, user, null);
        if (existingUserLinkedInId) {
            return user;
        }
        // if not, let's associate the user with the given Google profile
        yield updateFromLinkedInProfile(db, user, profile);
        return user;
    });
}
exports.findOrCreateFromLinkedInProfile = findOrCreateFromLinkedInProfile;
//# sourceMappingURL=linkedInOAuthService.js.map