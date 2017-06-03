import * as httpClient from '../../httpClient';
import * as fieldValidation from '../../../common/helpers/fieldValidation';


export default function (values) {
    return httpClient.checkUserName(values.name)
        .then((r) => {
            if (r.data.exists) {
                throw { name: fieldValidation.USER_NAME_IS_TAKEN };
            }
        });
}

