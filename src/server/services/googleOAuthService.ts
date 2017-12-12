import * as serverTypes from "../typings";
import * as googleOAuthTypes from "../typings/googleOAuthTypes";
import { safeRead } from "../../common/helpers/objectHelpers";
import { extractUserNameFromEmail, getValidUserName } from "./userService";
import { getGravatarImageFromEmail, GravatarSize } from "../helpers/gravatarHelper";

/**
 * Creates a user object from an OAuth Google profile
 * @param db Massive instance
 * @param profile
 * @returns Promise
 */
export async function createFromGoogleProfile(db: serverTypes.AboutDevsDatabase, profile: googleOAuthTypes.GoogleOAuthProfile) {
    if (!db) throw Error("'db' should be truthy");
    if (!profile) throw Error("'profile' should be truthy");

    const email = safeRead((p: googleOAuthTypes.GoogleOAuthProfile) => p.emails[0].value, profile, null);
    const photoUrl = getGravatarImageFromEmail(email, GravatarSize.medium);
    const userName = await getValidUserName(db, extractUserNameFromEmail(email));

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

    return (await db.user.insert(user)) as serverTypes.User;
}

/**
 * Updates a user object based on the given google profile
 * @param db Massive instance
 * @param existingUser
 * @param profile
 */
export async function updateFromGoogleProfile(db: serverTypes.AboutDevsDatabase, existingUser: serverTypes.User, profile: googleOAuthTypes.GoogleOAuthProfile): Promise<serverTypes.User> {
    if (!db) throw Error("'db' should be truthy");
    if (!existingUser) throw Error("'existingUser' should be truthy");
    if (!profile) throw Error("'profile' should be truthy");

    if (!existingUser.display_name) {
        existingUser.display_name = profile.displayName;
    }
    if (!existingUser.photo_url) {
        const email = safeRead((p: googleOAuthTypes.GoogleOAuthProfile) => p.emails[0].value, profile, null);
        existingUser.photo_url = getGravatarImageFromEmail(email, GravatarSize.medium);
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
    return (await db.user.save(existingUser)) as serverTypes.User;
}

/**
 * Finds the user based on the given google profile or creates a new user and returns that user
 * @param db
 * @param profile
 * @returns {Promise}
 */
export async function findOrCreateFromGoogleProfile(db: serverTypes.AboutDevsDatabase, profile: googleOAuthTypes.GoogleOAuthProfile): Promise<serverTypes.User> {
    if (!db) throw Error("'db' should be truthy");
    if (!profile) throw Error("'profile' should be truthy");

    const email = safeRead((p) => p.emails[0].value, profile, null);

    if (!email) {
        throw Error("Google profile is not valid");
    }

    const user = await db.user.findOne({email});

    if (!user) {
        return createFromGoogleProfile(db, profile);
    }

    // if the existing user is associated with Google already
    const existingUserGoogleId = safeRead((u) => u.oauth_profiles.linkedin.id, user, null);
    if (existingUserGoogleId) {
        return user;
    }

    // if not, let's associate the user with the given Google profile
    await updateFromGoogleProfile(db, user, profile);
    return user;
}
