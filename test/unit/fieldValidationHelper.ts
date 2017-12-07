import { assert } from "chai";
import * as fieldValidationHelper from "../../src/common/helpers/fieldValidationHelper";
import * as commonTypes from "../../src/common/typings";

function createProfile(object: any): commonTypes.UserProfile {
    const emptyProfile = {
        name: "",
        type: commonTypes.UserProfileType.RECRUITER,
        displayName: "",
        title: "",
        bio: "",
        address: "",
    };
    return { ...emptyProfile, ...object };
}

describe("fieldValidationHelper", () => {
    describe("validate", () => {
        it("Validate empty object - User normal", () => {
            const profile = createProfile({type: commonTypes.UserProfileType.DEVELOPER});
            const errors = fieldValidationHelper.validate(profile);
            assert.deepEqual(errors, {
                name: "required",
                displayName: "required",
                address: "required",
            });
        });
    });
});
