import * as httpClient from '../../httpClient';

export const USER_NAME_IS_TAKEN = 'user-name-is-taken';

export default function (values) {
    return httpClient.checkUserName(values.name)
        .then((r) => {
            if (r.data.exists) {
                throw { name: USER_NAME_IS_TAKEN };
            }
        });
}


