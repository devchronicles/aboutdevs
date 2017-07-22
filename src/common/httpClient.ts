import axios, { AxiosPromise } from 'axios';

import * as commonTypes from '../common/typings';

export function getProfileData() {
    return axios.get('/api/users/myprofile');
}

export function saveProfileData(profile: commonTypes.UserProfile): AxiosPromise {
    if (!profile) throw Error('Argument \'profile\' should be truthy');
    return axios.post('/api/users/myprofile', profile);
}

export function checkUserName(userName: string): AxiosPromise {
    if (!userName) throw Error('Argument \'userName\' should be truthy');
    const queryString = `q=${userName}`;
    return axios.get(`/api/users/checkname?${queryString}`);
}

// SEARCH

export function searchLocations(searchTerm: string, allowCities = false): AxiosPromise {
    const queryString = allowCities ? `q=${searchTerm}&allowcities=true` : `q=${searchTerm}`;
    return axios.get(`/api/address?${queryString}`);
}

export function searchProfessions(searchTerm: string): AxiosPromise {
    const queryString = `q=${searchTerm}`;
    return axios.get(`/api/professions?${queryString}`);
}
