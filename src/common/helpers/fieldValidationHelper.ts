import * as commonTypes from "../typings/commonTypes";
import { isUrl } from "./urlHelper";

export const REQUIRED = "required";
export const REQUIRED_IF_DEVELOPER = "required-if-developer";
export const MAX_LENGTH_50 = "max-length-50";
export const MAX_LENGTH_60 = "max-length-80";
export const MAX_LENGTH_80 = "max-length-80";
export const MAX_LENGTH_500 = "max-length-500";
export const USER_NAME_IS_TAKEN = "user-name-is-taken";
export const INCOMPLETE_SOCIAL_LINK = "incomplete-social-link";
export const URL = "url";

interface ValidationCollection {
    [key: string]: Array<(value: any, user?: commonTypes.UserProfile) => string>;
}

const validators: ValidationCollection = {
    "^name$": [validateRequired, validateMaxLength50],
    "^displayName$": [validateRequired, validateMaxLength50],
    "^title$": [validateRequired, validateMaxLength80],
    "^bio$": [validationRequiredIfDeveloper, validateMaxLength500],
    "^formattedAddress$": [validateRequired],
    ".*\.website": [validateRequired],
    ".*\.url": [validateRequired],
};

export function getValidatorsForField(fieldName: keyof commonTypes.UserProfile): Array<(value: any, user: commonTypes.UserProfile) => string> {
    for (const expression in validators) {
        if (validators.hasOwnProperty(expression)) {
            const regEx = new RegExp(expression);
            if (regEx.test(fieldName)) {
                return validators[expression];
            }
        }
    }
}

export function validateRequired(value: any) {
    return (value === null || value === undefined || value === "") ? REQUIRED : undefined;
}

export function validateMaxLength50(value: string) {
    if (!value) {
        return undefined;
    }
    return value.length > 50 ? MAX_LENGTH_50 : undefined;
}

export function validateMaxLength60(value: string) {
    if (!value) {
        return undefined;
    }
    return value.length > 60 ? MAX_LENGTH_60 : undefined;
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

export function validateUrl(value: string) {
    if (!value) {
        return undefined;
    }
    return isUrl(value) ? undefined : URL;
}

export function validationRequiredIfDeveloper(value: any, user: commonTypes.UserProfile) {
    return (user.type === commonTypes.UserProfileType.DEVELOPER && (value === null || value === undefined || value === "")) ? REQUIRED_IF_DEVELOPER : undefined;
}

export function validate(user: commonTypes.UserProfile) {
    const errors: { [key: string]: string } = {};
    for (const key in user) {
        if (user.hasOwnProperty(key)) {
            const value: any = user[key];
            const fieldValidators = getValidatorsForField(key);
            if (fieldValidators.length) {
                let error;
                for (const fieldValidator of fieldValidators) {
                    error = fieldValidator(value, user);
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
