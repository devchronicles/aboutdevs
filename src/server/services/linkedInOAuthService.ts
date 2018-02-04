import * as serverTypes from "../typings";
import * as linkedInOAuthTypes from "../typings/linkedInOAuthTypes";
import { safeRead } from "../../common/helpers/objectHelpers";
import { extractUserNameFromEmail, getValidUserName } from "./userService";
import { getGravatarImageFromEmail, GravatarSize } from "../helpers/gravatarHelper";
import { getAndSaveCity, searchLocationsFormatted } from "./locationService";
import { UserProfileStatus, UserProfileType } from "../../common/typings";

/**
 * Creates a user object from an OAuth Google profile
 * @param db Massive instance
 * @param profile
 * @returns Promise
 */
export async function createFromLinkedInProfile(db: serverTypes.AboutDevsDatabase, profile: linkedInOAuthTypes.LinkedInOAuthProfile) {
    if (!db) throw Error("'db' should be truthy");
    if (!profile) throw Error("'profile' should be truthy");

    const email = profile.emailAddress;
    const photoUrl = getGravatarImageFromEmail(email, GravatarSize.medium);

    const userName = await getValidUserName(db, extractUserNameFromEmail(email));

    const user: serverTypes.User = {
        bio: "",
        status: UserProfileStatus.PENDING_PROFILE_ACTIVATION,
        type: UserProfileType.DEVELOPER,
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
        const citiesFormatted = await searchLocationsFormatted(db, userLocation);
        if (citiesFormatted && citiesFormatted.length) {
            const googlePlace = await getAndSaveCity(db, citiesFormatted[0]);
            user.google_place_id = googlePlace.id;
            user.google_place_formatted_address = googlePlace.formatted_address;
        }
    }

    return (await db.user.insert(user)) as serverTypes.User;
}

/**
 * Updates a user object based on the given google profile
 * @param db Massive instance
 * @param existingUser
 * @param profile
 */
export async function updateFromLinkedInProfile(db: serverTypes.AboutDevsDatabase, existingUser: serverTypes.User, profile: linkedInOAuthTypes.LinkedInOAuthProfile): Promise<serverTypes.User> {
    if (!db) throw Error("'db' should be truthy");
    if (!existingUser) throw Error("'existingUser' should be truthy");
    if (!profile) throw Error("'profile' should be truthy");

    if (!existingUser.display_name) {
        existingUser.display_name = profile.formattedName;
    }
    if (!existingUser.photo_url) {
        const email = profile.emailAddress;
        existingUser.photo_url = getGravatarImageFromEmail(email, GravatarSize.medium);
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
    return (await db.user.save(existingUser)) as serverTypes.User;
}

/**
 * Finds the user based on the given google profile or creates a new user and returns that user
 * @param db
 * @param profile
 * @returns {Promise}
 */
export async function findOrCreateFromLinkedInProfile(db: serverTypes.AboutDevsDatabase, profile: linkedInOAuthTypes.LinkedInOAuthProfile): Promise<serverTypes.User> {
    if (!db) throw Error("'db' should be truthy");
    if (!profile) throw Error("'profile' should be truthy");

    const user = await db.user.findOne({email: profile.emailAddress});

    if (!user) {
        return createFromLinkedInProfile(db, profile);
    }

    // if the existing user is associated with LinkedIn already
    const existingUserLinkedInId = safeRead((u) => u.oauth_profiles.linkedin.id, user, null);
    if (existingUserLinkedInId) {
        return user;
    }

    // if not, let's associate the user with the given Google profile
    await updateFromLinkedInProfile(db, user, profile);
    return user;
}
