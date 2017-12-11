import axios, { AxiosPromise } from "axios";

import * as commonTypes from "../common/typings";

export function getProfileData() {
    return axios.get("/api/users/edit_my_profile");
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

export function searchDevelopers(search: string, location: string): AxiosPromise {
    if (!search) throw Error("search should be truthy");
    if (!location) throw Error("location should be truthy");
    return axios.get(`/api/users?q=${search}&l=${location}`);
}

export function searchLocations(search: string, allowCities = false): AxiosPromise {
    const queryString = allowCities ? `q=${search}&allowcities=true` : `q=${search}`;
    return axios.get(`/api/addresses?${queryString}`);
}