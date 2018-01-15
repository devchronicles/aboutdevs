"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const fieldValidationHelper = require("../../src/common/helpers/fieldValidationHelper");
const commonTypes = require("../../src/common/typings");
function createProfile(object) {
    const emptyProfile = {
        name: "",
        type: commonTypes.UserProfileType.RECRUITER,
        displayName: "",
        title: "",
        bio: "",
        address: "",
    };
    return Object.assign({}, emptyProfile, object);
}
describe("fieldValidationHelper", () => {
    describe("validate", () => {
        it("Validate empty object - User normal", () => {
            const profile = createProfile({ type: commonTypes.UserProfileType.DEVELOPER });
            const errors = fieldValidationHelper.validate(profile);
            chai_1.assert.deepEqual(errors, {
                name: "required",
                displayName: "required",
                address: "required",
                title: "required",
            });
        });
    });
});
//# sourceMappingURL=fieldValidationHelperSpec.js.map