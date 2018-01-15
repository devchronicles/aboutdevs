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
const faker = require("faker");
const buildDb_1 = require("../src/server/db/buildDb");
const userService = require("../src/server/services/userService");
const tagService = require("../src/server/services/tagService");
const stringHelper = require("../src/common/helpers/stringHelper");
const typings_1 = require("../src/common/typings");
const googlePlacesService_1 = require("../src/server/services/googlePlacesService");
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
function getRandomArrayItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}
buildDb_1.default()
    .then((db) => __awaiter(this, void 0, void 0, function* () {
    for (let i = 0; i < 5000; i++) {
        try {
            let userName = yield userService.getValidUserName(db, stringHelper.normalizeForUrl(faker.internet.userName()));
            userName += i;
            const email = `${userName}@gmail.com`;
            const user = {
                bio: faker.lorem.paragraphs(3, "\n\n"),
                status: typings_1.UserProfileStatus.PENDING_PROFILE_ACTIVATION,
                type: typings_1.UserProfileType.DEVELOPER,
                display_name: `${faker.name.firstName()} ${faker.name.lastName()}`,
                company_name: faker.company.companyName(),
                email,
                name: userName,
                title: faker.name.jobTitle(),
                oauth_profiles: {
                    linkedin: {
                        id: `${i + 1}`,
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
                tags_normalized: "",
            };
            // Location
            let userLocation = getRandomArrayItem(randomCities);
            if (userLocation) {
                userLocation = userLocation.replace(" Area", "");
                const citiesFormatted = yield googlePlacesService_1.searchCitiesFormatted(db, userLocation);
                if (citiesFormatted && citiesFormatted.length) {
                    const googlePlace = yield googlePlacesService_1.getAndSaveCity(db, citiesFormatted[0]);
                    user.google_place_id = googlePlace.id;
                    user.google_place_formatted_address = googlePlace.formatted_address;
                }
            }
            const insertedUser = (yield db.user.insert(user));
            const userProfile = yield userService.getUserProfile(db, insertedUser);
            const tagSearchResult1 = yield tagService.searchTagsFormatted(db, getRandomArrayItem(randomTags));
            const tagSearchResult2 = yield tagService.searchTagsFormatted(db, getRandomArrayItem(randomTags));
            const tagSearchResult3 = yield tagService.searchTagsFormatted(db, getRandomArrayItem(randomTags));
            userProfile.tags = [getRandomArrayItem(tagSearchResult1), getRandomArrayItem(tagSearchResult2), getRandomArrayItem(tagSearchResult3)];
            yield userService.saveProfile(db, insertedUser.id, userProfile);
        }
        catch (ex) {
            console.log("error");
            throw ex;
        }
        console.log("Person saved " + i);
    }
}))
    .then(() => {
    process.exit();
})
    .catch((error) => console.log(error));
//# sourceMappingURL=fake.js.map