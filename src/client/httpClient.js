import axios from 'axios';

export function getProfileData() {
    return axios.get('/api/users/getmyprofiledataforediting');
}

export function getAddresses(address) {
    return axios.get(`/api/address?q=${address}`);
}
