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
/**
 * Creates a user object from an OAuth Google profile
 * @param db Massive instance
 * @param profile
 * @returns Promise
 */
function createFromGoogleProfile(db, profile) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!db)
            throw Error("'db' should be truthy");
        if (!profile)
            throw Error("'profile' should be truthy");
        const email = objectHelpers_1.safeRead((p) => p.emails[0].value, profile, null);
        const photoUrl = gravatarHelper_1.getGravatarImageFromEmail(email, gravatarHelper_1.GravatarSize.medium);
        const userName = yield userService_1.getValidUserName(db, userService_1.extractUserNameFromEmail(email));
        const user = {
            display_name: profile.displayName,
            email,
            name: userName,
            oauth_profiles: {
                google: {
                    id: profile.id,
                    raw: profile,
                },
            },
            photo_url: photoUrl,
        };
        return (yield db.user.insert(user));
    });
}
exports.createFromGoogleProfile = createFromGoogleProfile;
/**
 * Updates a user object based on the given google profile
 * @param db Massive instance
 * @param existingUser
 * @param profile
 */
function updateFromGoogleProfile(db, existingUser, profile) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!db)
            throw Error("'db' should be truthy");
        if (!existingUser)
            throw Error("'existingUser' should be truthy");
        if (!profile)
            throw Error("'profile' should be truthy");
        if (!existingUser.display_name) {
            existingUser.display_name = profile.displayName;
        }
        if (!existingUser.photo_url) {
            const email = objectHelpers_1.safeRead((p) => p.emails[0].value, profile, null);
            existingUser.photo_url = gravatarHelper_1.getGravatarImageFromEmail(email, gravatarHelper_1.GravatarSize.medium);
        }
        if (!existingUser.oauth_profiles) {
            existingUser.oauth_profiles = {
                google: {
                    id: profile.id,
                    raw: profile,
                },
            };
        }
        if (!existingUser.oauth_profiles.google) {
            existingUser.oauth_profiles.google = {
                id: profile.id,
                raw: profile,
            };
        }
        return (yield db.user.save(existingUser));
    });
}
exports.updateFromGoogleProfile = updateFromGoogleProfile;
/**
 * Finds the user based on the given google profile or creates a new user and returns that user
 * @param db
 * @param profile
 * @returns {Promise}
 */
function findOrCreateFromGoogleProfile(db, profile) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!db)
            throw Error("'db' should be truthy");
        if (!profile)
            throw Error("'profile' should be truthy");
        const email = objectHelpers_1.safeRead((p) => p.emails[0].value, profile, null);
        if (!email) {
            throw Error("Google profile is not valid");
        }
        const user = yield db.user.findOne({ email });
        if (!user) {
            return createFromGoogleProfile(db, profile);
        }
        // if the existing user is associated with Google already
        const existingUserGoogleId = objectHelpers_1.safeRead((u) => u.oauth_profiles.linkedin.id, user, null);
        if (existingUserGoogleId) {
            return user;
        }
        // if not, let's associate the user with the given Google profile
        yield updateFromGoogleProfile(db, user, profile);
        return user;
    });
}
exports.findOrCreateFromGoogleProfile = findOrCreateFromGoogleProfile;
//# sourceMappingURL=googleOAuthService.js.map