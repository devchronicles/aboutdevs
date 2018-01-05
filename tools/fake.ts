import * as faker from "faker";

import buildDb from "../src/server/db/buildDb";

import * as userService from "../src/server/services/userService";
import * as serverTypes from "../src/server/typings";
import * as tagService from "../src/server/services/tagService";
import * as stringHelper from "../src/common/helpers/stringHelper";
import { UserProfileStatus, UserProfileType } from "../src/common/typings";
import { getAndSaveCity, searchCitiesFormatted } from "../src/server/services/googlePlacesService";

const randomTags = [
    // .NET
    "c#",
    ".net",
    "entity-framework",
    "asp.net",
    // JavaScript
    "javascript",
    "typescript",
    "es2015",
    "react",
    "angular",
    "vue",
    // Data science
    "machine-learning",
    "tensorflow",
    "matplotlib",
    "pandas",
    "python",
    // Languages
    "ruby-on-rails",
    "pascal",
    "go",
    "ruby",
    "kotlin",
];

const randomCities = [
    // North America
    "New York",
    "Seattle",
    "Boston",
    "Los Angeles",
    // Latin America
    "Mexico City",
    "Sao Paulo",
    "Rio de Janeiro",
    "Buenos Aires",
    // Europe
    "London",
    "Berlin",
    "Amsterdam",
    "Moscow",
    "Zurich",
    "Oslo",
    "Dublin",
    // Asia
    "Tokyo",
    "Hong Kong",
    "New Delhi",
];

function getRandomArrayItem(array: string[]) {
    return array[Math.floor(Math.random() * array.length)];
}

buildDb()
    .then(async db => {
        for (let i = 0; i < 5000; i++) {
            try {
                let userName = await userService.getValidUserName(db, stringHelper.normalizeForUrl(faker.internet.userName()));
                userName += i;
                const email = `${userName}@gmail.com`;

                const user: serverTypes.User = {
                    bio: faker.lorem.paragraphs(3, "\n\n"),
                    status: UserProfileStatus.PENDING_PROFILE_ACTIVATION,
                    type: UserProfileType.DEVELOPER,
                    display_name: `${faker.name.firstName()} ${faker.name.lastName()}`,
                    company_name: faker.company.companyName(),
                    email,
                    name: userName,
                    title: faker.name.jobTitle(),
                    oauth_profiles: {
                        linkedin: {
                            id: "1",
                            raw: {},
                        },
                    },
                    social_links: {
                        socialLinks: [{
                            website: "linkedin",
                            url: "http://www.linkedin.com",
                        }],
                    },
                    info_groups: null,
                    photo_url: faker.image.avatar(),
                    colors: {
                        headerBackground: "#252934",
                        headerText: "#FFFFFF",
                        bodyBackground: "#3073b5",
                        bodyText: "#FFFFFF",
                    },
                    tags: "",
                };

                // Location
                let userLocation = getRandomArrayItem(randomCities);
                if (userLocation) {
                    userLocation = userLocation.replace(" Area", "");
                    const citiesFormatted = await searchCitiesFormatted(db, userLocation);
                    if (citiesFormatted && citiesFormatted.length) {
                        const googlePlace = await getAndSaveCity(db, citiesFormatted[0]);
                        user.google_place_id = googlePlace.id;
                        user.google_place_formatted_address = googlePlace.formatted_address;
                    }
                }

                const insertedUser = (await db.user.insert(user)) as serverTypes.User;


                const userProfile = await userService.getUserProfile(db, insertedUser);

                const tagSearchResult1 = await tagService.searchTagsFormatted(db, getRandomArrayItem(randomTags));
                const tagSearchResult2 = await tagService.searchTagsFormatted(db, getRandomArrayItem(randomTags));
                const tagSearchResult3 = await tagService.searchTagsFormatted(db, getRandomArrayItem(randomTags));

                userProfile.tags = [getRandomArrayItem(tagSearchResult1), getRandomArrayItem(tagSearchResult2), getRandomArrayItem(tagSearchResult3)];

                await userService.saveProfile(db, insertedUser.id, userProfile);
            }
            catch (ex) {
                console.log("error");
                throw ex;
            }
            console.log("Person saved " + i);
        }


    })
    .then(() => {
        process.exit();
    })
    .catch((error) => console.log(error));