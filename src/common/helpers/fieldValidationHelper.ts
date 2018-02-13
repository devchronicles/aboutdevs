import * as commonTypes from "../typings/commonTypes";
import { isUrl } from "./urlHelper";
import { SearchFormModel } from "../typings";

// Generic
export const REQUIRED = "required";
export const MIN_LENGTH_4 = "min-length-4";
export const MAX_LENGTH_50 = "max-length-50";
export const MAX_LENGTH_80 = "max-length-80";
export const MAX_LENGTH_255 = "max-length-255";
export const MAX_LENGTH_5000 = "max-length-5000";
export const USER_NAME_IS_TAKEN = "user-name-is-taken";
export const INCOMPLETE_SOCIAL_LINK = "incomplete-social-link";
export const URL = "url";

// Specific
export const TOO_MANY_TAGS = "The maximum number of tags is 10";
export const REQUIRED_SEARCH_TAGS = "required-search-tags";
export const REQUIRED_SEARCH_LOCATION = "required-search-location";
export const ALL_GROUPS_MUST_HAVE_BETWEEN_1_AND_10_ITEMS = "all-groups-must-have-between-1-and-10-items";

interface ValidationCollection {
    [key: string]: Array<(value: any, allValues?: any) => string>;
}

const exactNameValidators: ValidationCollection = {
    // profile edit
    name: [validateRequired, validateUserName, validateMaxLength50],
    displayName: [validateRequired, validateMaxLength50],
    title: [validateRequired, validateMaxLength80],
    companyName: [validateMaxLength80],
    companyUrl: [validateUrl, validateMaxLength255],
    formattedAddress: [validateRequired, validateMaxLength255],
    tags: [validateRequired, validateTags],
    infoGroups: [validateInfoGroup],
    bio: [validateRequired, validateMaxLength5000],
    // search
    searchTags: [validateSearchTags],
};

const regexValidators: Array<{ pattern: RegExp, validators: Array<(value: any, user?: commonTypes.UserProfile) => string> }> = [
    {pattern: /socialLinks\[\d+\]\.website/, validators: [validateRequired, validateMaxLength255]},
    {pattern: /socialLinks\[\d+\]\.url/, validators: [validateRequired, validateUrl, validateMaxLength255]},
    {pattern: /infoGroups\[\d+\]\.title/, validators: [validateRequired]},
    {pattern: /infoGroups\[\d+\]\.items\[\d+\]\.title/, validators: [validateRequired, validateMaxLength80]},
    {pattern: /infoGroups\[\d+\]\.items\[\d+\]\.url/, validators: [validateUrl, validateMaxLength255]},
    {pattern: /infoGroups\[\d+\]\.items\[\d+\]\.tags/, validators: [validateTags]},
    {pattern: /infoGroups\[\d+\]\.items\[\d+\]\.description/, validators: [validateRequired, validateMaxLength5000]},
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

export function validateUserProfile(user: commonTypes.UserProfile) {
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

// Generic validators

export function validateRequired(value: any) {
    return value === null || value === undefined || value === "" || (value instanceof Array && value.length === 0) ? REQUIRED : undefined;
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
    return value.length > 255 ? MAX_LENGTH_255 : undefined;
}

export function validateMaxLength5000(value: string) {
    if (!value) {
        return undefined;
    }
    return value.length > 5000 ? MAX_LENGTH_5000 : undefined;
}

export function validateUrl(value: string) {
    if (!value) {
        return undefined;
    }
    return isUrl(value) ? undefined : URL;
}

// Specific validators

export function validateSearchTags(value: string, searchForm: SearchFormModel): string {
    if (searchForm.searchFormattedAddress) {
        return (value === null || value === undefined || value === "") ? REQUIRED_SEARCH_TAGS : undefined;
    }
    return undefined;
}

export function validateTags(value: any): string {
    return (value && value.length > 12) ? TOO_MANY_TAGS : undefined;
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

export function validateUserName(value: any): string {
    if (!value) {
        return undefined;
    }
    if (value.length < 4) return MIN_LENGTH_4;
    return undefined;
}
