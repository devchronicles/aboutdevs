import * as httpClient from "../../httpClient";
import * as fieldValidation from "../../../common/helpers/fieldValidationHelper";
import * as commonTypes from "../../../common/typings";

export default function (values: commonTypes.UserProfile) {
    if (values.name === null || values.name === undefined || values.name === "") {
        return Promise.resolve(undefined);
    }
    return httpClient.checkUserName(values.name)
        .then((r) => {
            if (r.data.exists) {
                throw {name: fieldValidation.USER_NAME_IS_TAKEN};
            }
        });
}
