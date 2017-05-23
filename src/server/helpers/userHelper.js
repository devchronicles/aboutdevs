import { safeRead } from '../../common/helpers/objectHelpers';
import * as stringHelper from '../../common/helpers/stringHelper';

/**
 * Extracts the user name from the user's e-mail
 */
export function extractUserNameFromEmail(email) {
    if (email === null || email === undefined) throw Error('Argument \'email\' should be null or undefined');
    const atPosition = email.indexOf('@');
    return email.substring(0, atPosition);
}

/**
 * Returns a suggested user name given the user e-mail
 */
export function getValidUserName(db, userName) {
    if (db === null || db === undefined) throw Error('Argument \'db\' should be null or undefined');
    if (userName === null || userName === undefined) throw Error('Argument \'email\' should be null or undefined');

    return db.user.findAsync({ 'name ilike': `${userName}%` })
        .then((r) => {
            if (r.length === 0) return userName;
            // this isn't actually necessary. TODO: Remove this.
            const lowerCaseUserNames = r.map(s => s.name.toLowerCase());
            let finalUserName = userName.toLowerCase();
            while (lowerCaseUserNames.includes(finalUserName)) {
                finalUserName = stringHelper.incrementLast(finalUserName, true);
            }
            return finalUserName;
        });
}

/**
 * Creates a user object from an OAuth Google profile
 * @param db Massive instance
 * @param profile
 * @returns Promise
 */
export function createFromGoogleProfile(db, profile) {
    if (!db) throw Error('\'db\' should be truthy');
    if (!profile) throw Error('\'profile\' should be truthy');

    const email = safeRead(p => p.emails[0].value, profile, null);
    const photoUrl = safeRead(p => p.photos[0].value, profile, null);

    return getValidUserName(db, extractUserNameFromEmail(email))
        .then(userName => ({
            name: userName,
            display_name: profile.displayName,
            photo_url: photoUrl,
            email,
            oauth_profiles: {
                google: {
                    id: profile.id,
                    raw: profile
                }
            }
        }))
        .then(user => db.user.saveAsync(user));
}

/**
 * Updates a user object based on the given google profile
 * @param db Massive instance
 * @param existingUser
 * @param profile
 */
export function updateFromGoogleProfile(db, existingUser, profile) {
    if (!db) throw Error('\'db\' should be truthy');
    if (!existingUser) throw Error('\'existingUser\' should be truthy');
    if (!profile) throw Error('\'profile\' should be truthy');

    if (!existingUser.display_name) {
        existingUser.display_name = profile.displayName;
    }
    if (!existingUser.photo_url) {
        existingUser.photo_url = safeRead(p => p.photos[0].value, profile, null);
    }
    if (!existingUser.oauth_profiles) {
        existingUser.oauth_profiles = {};
    }
    existingUser.oauth_profiles.google = {
        id: profile.id,
        raw: profile
    };
    return db.user.saveAsync(existingUser);
}

/**
 * Finds the user based on the given google profile or creates a new user and returns that user
 * @param db
 * @param profile
 * @returns {Promise}
 */
export function findOrCreateFromGoogleProfile(db, profile) {
    if (!db) throw Error('\'db\' should be truthy');
    if (!profile) throw Error('\'profile\' should be truthy');

    const email = safeRead(p => p.emails[0].value, profile, null);

    if (!email) { throw Error('Google profile is not valid'); }

    return db.user.findOneAsync({ email })
        .then((user) => {
            if (!user) { return createFromGoogleProfile(db, profile); }

            // if the existing user is associated with Google already
            // (u.oauth_profiles.google.id exists), returns it
            const existingUserGoogleId = safeRead(u => u.oauth_profiles.google.id, user, null);
            if (existingUserGoogleId) { return user; }

            // if not, let's associate the user with the given Google profile
            return updateFromGoogleProfile(db, user, profile);
        });
}
