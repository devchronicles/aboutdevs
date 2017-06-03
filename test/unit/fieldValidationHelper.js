import { assert } from 'chai';
import * as fieldValidationHelper from '../../src/common/helpers/fieldValidationHelper';

function createProfile(object) {
    const emptyProfile = {
        name: '',
        type: 0,
        displayName: '',
        profession: '',
        bio: '',
        activities: '',
        address: '',
        phoneWhatsapp: '',
        phoneAlternative: ''
    };
    return Object.assign({}, emptyProfile, object);
}

describe('fieldValidationHelper', () => {
    describe('validate', () => {
        it('Validate empty object - User normal', () => {
            const profile = createProfile({ type: 1 });
            const errors = fieldValidationHelper.validate(profile);
            assert.deepEqual(errors, {
                name: 'required',
                displayName: 'required',
                address: 'required',
                phoneWhatsapp: 'at-least-one-phone',
                phoneAlternative: 'at-least-one-phone'
            });
        });
        it('Validate empty object - User professional', () => {
            const profile = createProfile({ type: 0 });
            const errors = fieldValidationHelper.validate(profile);
            assert.deepEqual(errors, {
                name: 'required',
                displayName: 'required',
                profession: 'required-if-professional',
                bio: 'required-if-professional',
                activities: 'required-if-professional',
                address: 'required',
                phoneWhatsapp: 'at-least-one-phone',
                phoneAlternative: 'at-least-one-phone'
            });
        });
    });
});
