import axios from 'axios';

export function getProfileData() {
    return axios.get('/api/users/getmyprofiledataforediting');
}

export function getAddresses(address, allowCities = false) {
    const queryString = allowCities ? `q=${address}&allowcities=true` : `q=${address}`;
    return axios.get(`/api/address?${queryString}`);
}
