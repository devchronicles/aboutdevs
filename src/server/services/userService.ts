import * as fieldValidationHelper from '../../common/helpers/fieldValidationHelper';
import { safeRead } from '../../common/helpers/objectHelpers';
import * as stringHelper from '../../common/helpers/stringHelper';
import * as commonTypes from '../../common/typings/commonTypes';
import * as dbTypes from '../typings/dbTypes';
import * as googleOAuthTypes from '../typings/googleOAuthTypes';
import * as locationHelper from '../services/locationService';

/**
 * Extracts the user name from the user's e-mail
 */
export function extractUserNameFromEmail(email: string) {
    if (email === null || email === undefined) throw Error('Argument \'email\' should be null or undefined');
    const atPosition = email.indexOf('@');
    return email.substring(0, atPosition);
}

/**
 * Returns a suggested user name given the user e-mail
 */
export function getValidUserName(db: dbTypes.IndieJobsDatabase, userName: string) {
    if (db === null || db === undefined) throw Error('Argument \'db\' should be null or undefined');
    if (userName === null || userName === undefined) throw Error('Argument \'email\' should be null or undefined');

    return db.user.find({ 'name ilike': `${userName}%` })
        .then((r) => {
            if (r.length === 0) return userName;
            // this isn't actually necessary. TODO: Remove this.
            const lowerCaseUserNames = r.map((s) => s.name.toLowerCase());
            let finalUserName = userName.toLowerCase();
            while (lowerCaseUserNames.indexOf(finalUserName) !== -1) {
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
export async function createFromGoogleProfile(db: dbTypes.IndieJobsDatabase, profile: googleOAuthTypes.GoogleOAuthProfile) {
    if (!db) throw Error('\'db\' should be truthy');
    if (!profile) throw Error('\'profile\' should be truthy');

    const email = safeRead((p: googleOAuthTypes.GoogleOAuthProfile) => p.emails[0].value, profile, null);
    const photoUrl = safeRead((p: googleOAuthTypes.GoogleOAuthProfile) => p.photos[0].value, profile, null);
    const gender = profile.gender === 'male' ? 0 : 1;

    const userName = await getValidUserName(db, extractUserNameFromEmail(email));

    const user = {
        display_name: profile.displayName,
        email,
        gender,
        name: userName,
        oauth_profiles: {
            google: {
                id: profile.id,
                raw: profile,
            },
        },
        photo_url: photoUrl,
    };

    const insertedUser = (await db.user.insert(user)) as dbTypes.User;
    return insertedUser;
}

/**
 * Updates a user object based on the given google profile
 * @param db Massive instance
 * @param existingUser
 * @param profile
 */
export async function updateFromGoogleProfile(db: dbTypes.IndieJobsDatabase, existingUser: dbTypes.User, googleProfile: googleOAuthTypes.GoogleOAuthProfile)
    : Promise<dbTypes.User> {
    if (!db) throw Error('\'db\' should be truthy');
    if (!existingUser) throw Error('\'existingUser\' should be truthy');
    if (!googleProfile) throw Error('\'profile\' should be truthy');

    if (existingUser.gender === null || existingUser.gender === undefined) {
        existingUser.gender = googleProfile.gender === 'male' ? 0 : 1;
    }
    if (!existingUser.display_name) {
        existingUser.display_name = googleProfile.displayName;
    }
    if (!existingUser.photo_url) {
        existingUser.photo_url = safeRead((p) => p.photos[0].value, googleProfile, null);
    }
    if (!existingUser.oauth_profiles) {
        existingUser.oauth_profiles = {
            google: {
                id: googleProfile.id,
                raw: googleProfile,
            },
        };
    }
    if (!existingUser.oauth_profiles.google) {
        existingUser.oauth_profiles.google = {
            id: googleProfile.id,
            raw: googleProfile,
        };
    }
    const savedUser = (await db.user.save(existingUser)) as dbTypes.User;
    return savedUser;
}

/**
 * Finds the user based on the given google profile or creates a new user and returns that user
 * @param db
 * @param profile
 * @returns {Promise}
 */
export function findOrCreateFromGoogleProfile(db: dbTypes.IndieJobsDatabase, profile: googleOAuthTypes.GoogleOAuthProfile)
    : Promise<dbTypes.User> {
    if (!db) throw Error('\'db\' should be truthy');
    if (!profile) throw Error('\'profile\' should be truthy');

    const email = safeRead((p) => p.emails[0].value, profile, null);

    if (!email) { throw Error('Google profile is not valid'); }

    return db.user.findOne({ email })
        .then((user: dbTypes.User) => {
            if (!user) { return createFromGoogleProfile(db, profile); }

            // if the existing user is associated with Google already
            // (u.oauth_profiles.google.id exists), returns it
            const existingUserGoogleId = safeRead((u) => u.oauth_profiles.google.id, user, null);
            if (existingUserGoogleId) { return user; }

            // if not, let's associate the user with the given Google profile
            updateFromGoogleProfile(db, user, profile);
            return user;
        });
}

export function getReduxDataForLoggedUser(user: dbTypes.User): commonTypes.ReduxCurrentUserProfile {
    if (user === null || user === undefined) throw Error('Argument \'user\' should be null or undefined');
    return {
        id: user.id,
        name: user.name,
        gender: user.gender,
        displayName: user.display_name,
        photoUrl: user.photo_url,
    };
}

async function getProfileDataFromUser(db: dbTypes.IndieJobsDatabase, user: dbTypes.User): Promise<commonTypes.UserProfile> {
    if (!db) throw Error('Argument \'db\' should be truthy');
    if (!user) throw Error('Argument \'user\' should be truthy');

    return {
        id: user.id,
        name: user.name,
        displayName: user.display_name,
        photoUrl: user.photo_url,
        type: user.type,
        status: user.status,
        address: await (user.geo_location_id ? locationHelper.getFormattedLocationById(db, user.geo_location_id) : null),
        phoneWhatsapp: user.phone_whatsapp,
        phoneAlternative: user.phone_alternative,
        bio: user.bio,
        activities: user.activities,
    };
}

export async function getProfile(db: dbTypes.IndieJobsDatabase, userId: number): Promise<commonTypes.UserProfile> {
    return db.user.findOne({ id: userId })
        .then((u) => getProfileDataFromUser(db, u));
}

export async function saveProfile(db: dbTypes.IndieJobsDatabase, userId: number, profile: commonTypes.UserProfile): Promise<commonTypes.UserProfile> {
    let user = await db.user.findOne({ id: userId });
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

    user = (await db.user.update(user)) as dbTypes.User;

    // change status
    if (user.status === 0) {
        user.status = 1;
        user = (await db.user.save(user)) as dbTypes.User;
    }

    return getProfileDataFromUser(db, user);
}

/**
 * Returns an object with a key for each property that has an error on it. The value is the error key
 * @param db The database
 * @param profile The profile being validated
 */
export async function validateProfile(db: dbTypes.IndieJobsDatabase, profile: commonTypes.UserProfile) {
    const updatedProfile = {
        name: '',
        type: 0,
        displayName: '',
        profession: '',
        bio: '',
        activities: '',
        address: '',
        phoneWhatsapp: '',
        phoneAlternative: '',
        ...profile,
    };

    const errors = fieldValidationHelper.validate(updatedProfile);
    const userNameTaken = (await db.is_user_name_taken(updatedProfile.name, updatedProfile.id))[0];
    if (userNameTaken.exists) {
        errors.name = fieldValidationHelper.USER_NAME_IS_TAKEN;
    }
    return errors;
}