"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const httpClient = require("../../httpClient");
const fieldValidation = require("../../../common/helpers/fieldValidationHelper");
function default_1(values) {
    return httpClient.checkUserName(values.name)
        .then((r) => {
        if (r.data.exists) {
            throw { name: fieldValidation.USER_NAME_IS_TAKEN };
        }
    });
}
exports.default = default_1;
//# sourceMappingURL=asyncValidation.js.map