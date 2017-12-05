import * as fieldValidationHelper from "../../common/helpers/fieldValidationHelper";
import * as commonTypes from "../../common/typings/commonTypes";
import * as serverTypes from "../typings";
import * as locationService from "../services/locationService";
import * as stringHelper from "../../common/helpers/stringHelper";

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
        gender: user.gender,
        displayName: user.display_name,
        photoUrl: user.photo_url,
    };
}

/**
 * Gets the profession in a way that it can be presented in the client
 * @param db The database object
 * @param professionId The id of the profession of the id
 * @param otherProfession The profession_other field of the user
 * @param userGender The user gender
 */
async function getFormattedProfession(db: serverTypes.AboutDevsDatabase, professionId: number, otherProfession: string, userGender: serverTypes.UserGender): Promise<string> {
    if (professionId) {
        const profession = await db.profession.findOne({id: professionId});
        if (profession) {
            switch (userGender) {
                case serverTypes.UserGender.MALE:
                    return profession.name_canonical;
                case serverTypes.UserGender.FEMALE:
                    return profession.name_feminine;
            }
        }
    }
    return otherProfession;
}

async function getServicesForUser(db: serverTypes.AboutDevsDatabase, userId: number): Promise<commonTypes.UserService[]> {
    const services = await db.user_service.find({user_id: userId});
    if (!services.length) {
        return [{
            id: undefined,
            service: "",
            index: 0,
        }];
    }
    return services.map((s) => ({
        id: s.id,
        service: s.service,
        index: s.index,
    }));
}

export async function getUserProfileFromUser(db: serverTypes.AboutDevsDatabase, user: serverTypes.User, currentUserId: number, operation: commonTypes.Operation): Promise<commonTypes.UserProfile> {
    if (!db) throw Error("Argument 'db' should be truthy");
    if (!user) throw Error("Argument 'user' should be truthy");

    switch (operation) {
        case commonTypes.Operation.VIEW:
            const isConnected = !!db.user_connection.findOne({user_id: currentUserId, user_professional_id: user.id});
            return {
                id: user.id,
                name: user.name,
                email: (isConnected || user.id === currentUserId) ? user.email : undefined,
                displayName: user.display_name,
                photoUrl: user.photo_url,
                type: user.type,
                status: user.status,
                address: await (user.geo_location_id ? locationService.getFormattedLocationById(db, user.geo_location_id) : null),
                profession: await getFormattedProfession(db, user.profession_id, user.profession_other, user.gender),
                phoneWhatsapp: (isConnected || user.id === currentUserId) ? user.phone_whatsapp : undefined,
                phoneAlternative: (isConnected || user.id === currentUserId) ? user.phone_alternative : undefined,
                bio: user.bio,
                services: await getServicesForUser(db, user.id),
            };

        case commonTypes.Operation.EDIT:
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                displayName: user.display_name,
                photoUrl: user.photo_url,
                type: user.type,
                status: user.status,
                address: await (user.geo_location_id ? locationService.getFormattedLocationById(db, user.geo_location_id) : null),
                profession: await getFormattedProfession(db, user.profession_id, user.profession_other, user.gender),
                phoneWhatsapp: user.phone_whatsapp,
                phoneAlternative: user.phone_alternative,
                bio: user.bio,
                services: await getServicesForUser(db, user.id),
            };
        default:
            throw Error("Operation not supported");
    }
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
 * @param professionId The profession id. This is for testing only. In production, this variable cannot contain value
 * @param locationId The location id. This is for testing only. In production, this variable cannot contain value
 */
export async function saveProfile(db: serverTypes.AboutDevsDatabase, userId: number, profile: commonTypes.UserProfile, professionId?: number, locationId?: number): Promise<commonTypes.UserProfile> {
    let user = await db.user.findOne({id: userId});
    if (!user) throw Error("could not find user");

    user.name = profile.name;
    user.display_name = profile.displayName;
    user.type = profile.type;
    user.phone_whatsapp = profile.phoneWhatsapp;
    user.phone_alternative = profile.phoneAlternative;
    if (profile.type === commonTypes.UserProfileType.PROFESSIONAL) {
        user.bio = profile.bio;
    }

    // profession
    if (!professionId) {
        const professionNormalized = stringHelper.normalizeForSearch(profile.profession);
        const professions = await db.search_professions_for_save(professionNormalized);
        if (professions.length) {
            user.profession_id = professions[0].id;
            user.profession_other = undefined;
        } else {
            user.profession_id = undefined;
            user.profession_other = profile.profession;
        }
    } else {
        if (process.env.NODE_ENV === "production") {
            throw Error("Passing location id is a not enabled in production");
        }
        user.profession_id = professionId;
        user.profession_other = undefined;
    }

    // location
    if (!locationId) {
        const location = await locationService.saveAddress(db, profile.address);
        user.geo_location_id = location.id;
    } else {
        if (process.env.NODE_ENV === "production") {
            throw Error("Passing location id is a not enabled in production");
        }
        user.geo_location_id = locationId;
    }

    // services
    if (profile.type === commonTypes.UserProfileType.PROFESSIONAL) {

        type UserServiceCanonical = commonTypes.UserService & { service_canonical: string };

        const profileServices: UserServiceCanonical[] = profile.services
            ? profile
                .services.map((s, index) => {
                    return {
                        id: s.id,
                        service: s.service,
                        service_canonical: stringHelper.normalizeForSearch(s.service),
                        index,
                    };
                })
                .filter((s) => !!s.service_canonical)
            : [];

        const persistedUserServices = await db.user_service.find({user_id: userId});

        // add or update services that are persistent already
        for (const profileService of profileServices) {
            if (profileService.id) {
                // the service is persistent already
                const existingService = await db.user_service.findOne({id: profileService.id});
                existingService.service = profileService.service;
                existingService.service_canonical = stringHelper.normalizeForSearch(profileService.service);
                existingService.index = profileService.index;
                await db.user_service.update(existingService);
            } else {
                // the service hasn't been persisted yet
                await db.user_service.insert({
                    service: profileService.service,
                    service_canonical: stringHelper.normalizeForSearch(profileService.service),
                    user_id: userId,
                    index: profileService.index,
                });
            }
        }

        // remove services that were removed
        const removedServices = persistedUserServices
            .filter((dbService) => profileServices.findIndex((profileService) => profileService.id === dbService.id) === -1);

        for (const removedService of removedServices) {
            await db.user_service.destroy({id: removedService.id});
        }

        // search
        const concatenatedServices = profileServices.map((p) => p.service_canonical).reduce((accumulated, current) => `${accumulated} ${current}`, "");
        const professionForSearch = stringHelper.normalizeForSearch(profile.profession);

        user.search_canonical = `${professionForSearch} ${concatenatedServices}`;
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
 * Searches professionals
 * @param {AboutDevsDatabase} db
 * @param {string} search
 * @param {string} location
 * @returns {Promise<UserSearchProfile[]>}
 */
export async function searchProfessionals(db: serverTypes.AboutDevsDatabase, search: string, location: string): Promise<commonTypes.UserSearchProfile[]> {
    // we need to convert the location to latitude and longitude
    const locations = await locationService.searchLocations(db, location, true);
    if (!locations.results.length) {
        return [];
    }
    const googleApiResult = locations.results[0];
    const {lat, lng} = googleApiResult.geometry.location;
    const searchNormalized = stringHelper.normalizeForSearch(search);

    const result: commonTypes.UserSearchProfile[] = [];
    const searchIntermediateResult = await db.search_users(searchNormalized, lng, lat);

    for (const intermediateResult of searchIntermediateResult) {
        const userServices = await db.user_service.find({user_id: intermediateResult.id});
        const userProfession = intermediateResult.profession_id
            ? (await db.profession.findOne({id: intermediateResult.profession_id}))
            : null;
        const user: commonTypes.UserSearchProfile = {
            id: intermediateResult.id,
            name: intermediateResult.name,
            displayName: intermediateResult.display_name,
            photoUrl: intermediateResult.photo_url,
            distance: intermediateResult.distance,
            profession: userProfession
                ? (intermediateResult.gender === serverTypes.UserGender.MALE ? userProfession.name_canonical : userProfession.name_feminine)
                : intermediateResult.profession_other,
            services: userServices.map((us) => ({
                id: us.id,
                service: us.service,
                index: us.index,
            })).sort((us1, us2) => us1.index - us2.index),
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
        profession: "",
        bio: "",
        address: "",
        phoneWhatsapp: "",
        phoneAlternative: "",
        ...profile,
    };

    const errors = fieldValidationHelper.validate(updatedProfile);
    const userNameTaken = (await db.is_user_name_taken(updatedProfile.name, updatedProfile.id))[0];
    if (userNameTaken.exists) {
        errors.name = fieldValidationHelper.USER_NAME_IS_TAKEN;
    }
    return errors;
}
