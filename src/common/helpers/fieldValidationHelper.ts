import * as commonTypes from "../typings/commonTypes";
import { isUrl } from "./urlHelper";

export const REQUIRED = "required";
export const MAX_LENGTH_50 = "max-length-50";
export const MAX_LENGTH_80 = "max-length-80";
export const MAX_LENGTH_255 = "max-length-255";
export const MAX_LENGTH_500 = "max-length-500";
export const USER_NAME_IS_TAKEN = "user-name-is-taken";
export const INCOMPLETE_SOCIAL_LINK = "incomplete-social-link";
export const URL = "url";
export const ALL_GROUPS_MUST_HAVE_BETWEEN_1_AND_10_ITEMS = "all-groups-must-have-between-1-and-10-items";

interface ValidationCollection {
    [key: string]: Array<(value: any, user?: commonTypes.UserProfile) => string>;
}

const exactNameValidators: ValidationCollection = {
    name: [validateRequired, validateMaxLength50],
    displayName: [validateRequired, validateMaxLength50],
    title: [validateRequired, validateMaxLength80],
    companyName: [validateMaxLength80],
    companyUrl: [validateMaxLength255, validateUrl],
    formattedAddress: [validateRequired, validateMaxLength255],
    tags: [validationRequiredIfDeveloper],
    bio: [validationRequiredIfDeveloper, validateMaxLength500],
    infoGroups: [validateInfoGroup],
};

const regexValidators: Array<{ pattern: RegExp, validators: Array<(value: any, user?: commonTypes.UserProfile) => string> }> = [
    {pattern: /socialLinks\[\d+\]\.website/, validators: [validateRequired]},
    {pattern: /socialLinks\[\d+\]\.url/, validators: [validateRequired, validateUrl]},
    {pattern: /infoGroups\[\d+\]\.title/, validators: [validateRequired]},
    {pattern: /infoGroups\[\d+\]\.items\[\d+\]\.title/, validators: [validateRequired]},
    {pattern: /infoGroups\[\d+\]\.items\[\d+\]\.url/, validators: [validateUrl]},
    {pattern: /infoGroups\[\d+\]\.items\[\d+\]\.description/, validators: [validateRequired]},
];

export function getValidatorsForField(fieldName: keyof commonTypes.UserProfile): Array<(value: any, user: commonTypes.UserProfile) => string> {
    const validators: Array<(value: any, user?: commonTypes.UserProfile) => string> = [];
    if (exactNameValidators[fieldName]) {
        validators.push(...exactNameValidators[fieldName]);
    }
    for (const rule of regexValidators) {
        if (rule.pattern.test(fieldName)) {
            validators.push(...rule.validators);
        }
    }
    return validators;
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

// Validators

export function validateRequired(value: any) {
    return (value === null || value === undefined || value === "") ? REQUIRED : undefined;
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

export function validateMaxLength255(value: string) {
    if (!value) {
        return undefined;
    }
    return value.length > 255 ? MAX_LENGTH_500 : undefined;
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
    return (user.type === commonTypes.UserProfileType.DEVELOPER
        && (value === null || value === undefined || value === "" || ((value instanceof Array) && value.length === 0)))
        ? REQUIRED
        : undefined;
}

export function validateInfoGroup(value: any): string {
    if (!value) {
        return undefined;
    }
    for (const group of value) {
        if (!group.items || !group.items.length || group.items.length > 10) {
            return ALL_GROUPS_MUST_HAVE_BETWEEN_1_AND_10_ITEMS;
        }
    }
    return undefined;
}
