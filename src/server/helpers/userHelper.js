import { safeRead } from '../../common/helpers/objectHelpers';
import * as stringHelper from '../../common/helpers/stringHelper';
import * as locationHelper from './locationHelper';
import * as fieldValidationHelper from '../../common/helpers/fieldValidationHelper';

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

    return db.user.find({ 'name ilike': `${userName}%` })
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
    const gender = profile.gender === 'male' ? 0 : 1;

    return getValidUserName(db, extractUserNameFromEmail(email))
        .then(userName => ({
            name: userName,
            gender,
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
        .then(user => db.user.save(user));
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

    if (existingUser.gender === null || existingUser.gender === undefined) {
        existingUser.gender = profile.gender === 'male' ? 0 : 1;
    }
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
    return db.user.save(existingUser);
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

    return db.user.findOne({ email })
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

export function getReduxDataForLoggedUser(user) {
    if (user === null || user === undefined) throw Error('Argument \'user\' should be null or undefined');
    return {
        id: user.id,
        name: user.name,
        gender: user.gender,
        displayName: user.display_name,
        photoUrl: user.photo_url
    };
}

export async function getProfile(db, userId) {
    return db.user.findOne({ id: userId })
        .then((u) => {
            if (u) {
                return {
                    id: u.id,
                    name: u.name,
                    displayName: u.display_name,
                    photoUrl: u.photo_url,
                    type: u.type
                };
            }
            throw Error('could not find user');
        });
}

export async function saveProfile(db, userId, profile) {
    const user = await db.user.findOne({ id: userId });
    if (!user) throw Error('could not find user');

    user.display_name = profile.displayName;
    user.type = profile.type; // 0 -> user 1 -> professional
    user.bio = profile.bio;
    user.activities = profile.activities;
    user.phone_whatsapp = profile.phoneWhatsapp;
    user.phone_alternative = profile.phoneAlternative;

    // profession
    const professions = await db.search_professions_for_save(profile.profession);
    if (professions.length) {
        user.profession_id = professions[0];
    } else {
        user.profession_other = profile.profession;
    }

    // location
    const location = await locationHelper.saveLocation(db, profile.address);
    user.geo_location_id = location.id;

    await db.user.save(user);

    // change status
    if (user.status === 0) {
        user.status = 1;
        await db.user.save(user);
    }

    return user;
}

export async function validateProfile(db, profile) {
    const updatedProfile = Object.assign({
        name: '',
        type: 0,
        displayName: '',
        profession: '',
        bio: '',
        activities: '',
        address: '',
        phoneWhatsapp: '',
        phoneAlternative: ''
    }, profile);
    const errors = fieldValidationHelper.validate(updatedProfile);
    const userNameTaken = await db.is_user_name_taken(updatedProfile.name, updatedProfile.id)[0];
    if (userNameTaken) {
        errors.name = fieldValidationHelper.USER_NAME_IS_TAKEN;
    }
    return errors;
}
