"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const googlePlacesFormatHelper_1 = require("./helpers/googlePlacesFormatHelper");
const tagHelper_1 = require("../server/helpers/tagHelper");
function getMyProfileData() {
    return axios_1.default.get("/api/users/edit_my_profile");
}
exports.getMyProfileData = getMyProfileData;
function getProfileData(userName) {
    if (!userName)
        throw Error("Argument is null or undefined. Argument: userName");
    return axios_1.default.get(`/api/users/${userName}`);
}
exports.getProfileData = getProfileData;
function saveProfileData(profile) {
    if (!profile)
        throw Error("Argument 'profile' should be truthy");
    return axios_1.default.post("/api/users/edit_my_profile", profile);
}
exports.saveProfileData = saveProfileData;
function checkUserName(userName) {
    if (!userName)
        throw Error("Argument 'userName' should be truthy");
    const queryString = `q=${userName}`;
    return axios_1.default.get(`/api/users/check_name?${queryString}`);
}
exports.checkUserName = checkUserName;
// SEARCH
function searchDevelopers(tags, formattedAddress) {
    if (!tags)
        throw Error("search should be truthy");
    if (!formattedAddress)
        throw Error("location should be truthy");
    const { placeId, address } = googlePlacesFormatHelper_1.getDataFromFormattedAddress(formattedAddress);
    const tagsParameter = tagHelper_1.createTagsParameter(tags);
    return axios_1.default.get(`/api/s/t/${tagsParameter}/l/${placeId}/${address}`);
}
exports.searchDevelopers = searchDevelopers;
function searchLocations(search) {
    const queryString = `q=${search}`;
    return axios_1.default.get(`/api/addresses?${queryString}`);
}
exports.searchLocations = searchLocations;
function searchTags(search) {
    const queryString = `q=${search}`;
    return axios_1.default.get(`/api/tags?${queryString}`);
}
exports.searchTags = searchTags;
//# sourceMappingURL=httpClient.js.map