import { assert } from 'chai';
import * as fieldValidationHelper from '../../src/common/helpers/fieldValidationHelper';
import * as commonTypes from '../../src/common/typings';

function createProfile(object: any): commonTypes.UserProfile {
    const emptyProfile = {
        name: '',
        type: commonTypes.UserProfileType.PROFESSIONAL,
        displayName: '',
        profession: '',
        bio: '',
        address: '',
        phoneWhatsapp: '',
        phoneAlternative: '',
    };
    return { ...emptyProfile, ...object };
}

describe('fieldValidationHelper', () => {
    describe('validate', () => {
        it('Validate empty object - User normal', () => {
            const profile = createProfile({ type: commonTypes.UserProfileType.USER });
            const errors = fieldValidationHelper.validate(profile);
            assert.deepEqual(errors, {
                name: 'required',
                displayName: 'required',
                address: 'required',
                phoneWhatsapp: 'at-least-one-phone',
                phoneAlternative: 'at-least-one-phone',
            });
        });
    });
});
