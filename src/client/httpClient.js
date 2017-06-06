import axios from 'axios';

export function getProfileData() {
    return axios.get('/api/users/myprofile');
}

export function saveProfileData(profile) {
    if (!profile) throw Error('Argument \'profile\' should be truthy');
    return axios.post('/api/users/myprofile', profile);
}

export function getFormattedLocations(searchTerm, allowCities = false) {
    const queryString = allowCities ? `q=${searchTerm}&allowcities=true` : `q=${searchTerm}`;
    return axios.get(`/api/address?${queryString}`);
}

export function getProfessions(searchTerm) {
    const queryString = `q=${searchTerm}`;
    return axios.get(`/api/professions?${queryString}`);
}

export function checkUserName(userName) {
    if (!userName) throw Error('Argument \'userName\' should be truthy');
    const queryString = `q=${userName}`;
    return axios.get(`/api/users/checkname?${queryString}`);
}
