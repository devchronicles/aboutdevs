import axios, { AxiosPromise } from "axios";

import * as commonTypes from "../common/typings";
import { getDataFromFormattedAddress } from "./helpers/googlePlacesFormatHelper";
import { createTagsParameter } from "../server/helpers/tagHelper";

export function getMyProfileData() {
    return axios.get("/api/users/edit_my_profile");
}

export function getProfileData(userName: string) {
    if (!userName) throw Error("Argument is null or undefined. Argument: userName");
    return axios.get(`/api/users/${userName}`);
}

export function saveProfileData(profile: commonTypes.UserProfile): AxiosPromise {
    if (!profile) throw Error("Argument 'profile' should be truthy");
    return axios.post("/api/users/edit_my_profile", profile);
}

export function checkUserName(userName: string): AxiosPromise {
    if (!userName) throw Error("Argument 'userName' should be truthy");
    const queryString = `q=${userName}`;
    return axios.get(`/api/users/check_name?${queryString}`);
}

// SEARCH

export function searchDevelopers(tags: string[], formattedAddress: string): AxiosPromise {
    if (!tags) throw Error("search should be truthy");
    if (!formattedAddress) throw Error("location should be truthy");
    const {placeId, address} = getDataFromFormattedAddress(formattedAddress);
    const tagsParameter = createTagsParameter(tags);
    return axios.get(`/api/s/t/${tagsParameter}/l/${placeId}/${address}`);
}

export function searchLocations(search: string): AxiosPromise {
    const queryString = `q=${search}`;
    return axios.get(`/api/addresses?${queryString}`);
}

export function searchTags(search: string): AxiosPromise {
    const queryString = `q=${search}`;
    return axios.get(`/api/tags?${queryString}`);
}
