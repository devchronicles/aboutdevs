import * as commonTypes from '../typings/commonTypes';

export const REQUIRED = 'required';
export const REQUIRED_IF_PROFESSIONAL = 'required-if-professional';
export const INVALID_PHONE = 'invalid-phone';
export const AT_LEAST_ONE_PHONE = 'at-least-one-phone';
export const MAX_LENGTH_50 = 'max-length-50';
export const MAX_LENGTH_80 = 'max-length-80';
export const MAX_LENGTH_500 = 'max-length-500';
export const USER_NAME_IS_TAKEN = 'user-name-is-taken';

export function validateRequired(value: any) {
    return (value === null || value === undefined || value === '') ? REQUIRED : undefined;
}

export function validateMaxLength50(value: string) {
    if (!value) {
        return undefined;
    }
    return value.length > 50 ? MAX_LENGTH_50 : undefined;
}

export function validateMaxLength80(value: string) {
    if (!value) {
        return undefined;
    }
    return value.length > 80 ? MAX_LENGTH_80 : undefined;
}

export function validateMaxLength500(value: string) {
    if (!value) {
        return undefined;
    }
    return value.length > 500 ? MAX_LENGTH_500 : undefined;
}

export function validationRequiredIfProfessional(value: any, user: commonTypes.UserProfile) {
    return (user.type === 0 && (value === null || value === undefined || value === '')) ? REQUIRED_IF_PROFESSIONAL : undefined;
}

export function validatePhone(value: string) {
    if (value === null || value === undefined || value === '') {
        return undefined;
    }
    return /\(\d{2}\)\s\d{3,5}-\d{4}/.test(value) ? undefined : INVALID_PHONE;
}

export function validateAtLeastOnePhone(value: string, user: commonTypes.UserProfile) {
    const invalidWhatsapp = user.phoneWhatsapp === null || user.phoneWhatsapp === undefined || user.phoneWhatsapp === '';
    const invalidAlternatePhone = user.phoneAlternative === null || user.phoneAlternative === undefined || user.phoneAlternative === '';
    return invalidWhatsapp && invalidAlternatePhone ? AT_LEAST_ONE_PHONE : undefined;
}

export function getValidatorsForField(fieldName: string): Array<(value: any, user: commonTypes.UserProfile) => string> {
    switch (fieldName) {
        case 'name':
            return [validateRequired, validateMaxLength50];
        case 'displayName':
            return [validateRequired, validateMaxLength50];
        case 'profession':
            return [validationRequiredIfProfessional, validateMaxLength80];
        case 'bio':
            return [validationRequiredIfProfessional, validateMaxLength500];
        case 'activities':
            return [validationRequiredIfProfessional, validateMaxLength500];
        case 'address':
            return [validateRequired];
        case 'phoneWhatsapp':
            return [validateAtLeastOnePhone, validatePhone];
        case 'phoneAlternative':
            return [validateAtLeastOnePhone, validatePhone];
        default:
            return [];
    }
}

export function validate(user: commonTypes.UserProfile) {
    const errors: { [key: string]: string } = {};
    for (const key in user) {
        if (user.hasOwnProperty(key)) {
            const value: any = user[key];
            const fieldValidators = getValidatorsForField(key);
            if (fieldValidators.length) {
                let error;
                for (const validate of fieldValidators) {
                    error = validate(value, user);
                    if (error) break;
                }
                if (error) {
                    errors[key] = error;
                }
            }
        }
    }
    return errors;
}
