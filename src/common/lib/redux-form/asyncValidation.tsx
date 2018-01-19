import * as httpClient from "../../httpClient";
import * as fieldValidation from "../../../common/helpers/fieldValidationHelper";
import * as commonTypes from "../../../common/typings";

export default function (values: commonTypes.UserProfile, dispatch: any, props: any, blurredField: string) {
    // TODO: Fix this bug. Async validation is being called for all fields
    if (blurredField !== "name") return Promise.resolve(undefined);
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
