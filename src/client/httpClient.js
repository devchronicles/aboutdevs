import axios from 'axios';

export function getProfileData() {
    return axios.get('/api/users/getmyprofiledataforediting');
}
