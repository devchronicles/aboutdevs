"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commonTypes = require("../typings/commonTypes");
const urlHelper_1 = require("./urlHelper");
// Generic
exports.REQUIRED = "required";
exports.MAX_LENGTH_50 = "max-length-50";
exports.MAX_LENGTH_80 = "max-length-80";
exports.MAX_LENGTH_255 = "max-length-255";
exports.MAX_LENGTH_500 = "max-length-500";
exports.USER_NAME_IS_TAKEN = "user-name-is-taken";
exports.INCOMPLETE_SOCIAL_LINK = "incomplete-social-link";
exports.URL = "url";
// Specific
exports.REQUIRED_SEARCH_TAGS = "required-search-tags";
exports.REQUIRED_SEARCH_LOCATION = "required-search-location";
exports.ALL_GROUPS_MUST_HAVE_BETWEEN_1_AND_10_ITEMS = "all-groups-must-have-between-1-and-10-items";
const exactNameValidators = {
    // search
    searchTags: [validateSearchTags],
    searchFormattedAddress: [validateSearchLocation],
    // profile edit
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
const regexValidators = [
    { pattern: /socialLinks\[\d+\]\.website/, validators: [validateRequired] },
    { pattern: /socialLinks\[\d+\]\.url/, validators: [validateRequired, validateUrl] },
    { pattern: /infoGroups\[\d+\]\.title/, validators: [validateRequired] },
    { pattern: /infoGroups\[\d+\]\.items\[\d+\]\.title/, validators: [validateRequired] },
    { pattern: /infoGroups\[\d+\]\.items\[\d+\]\.url/, validators: [validateUrl] },
    { pattern: /infoGroups\[\d+\]\.items\[\d+\]\.description/, validators: [validateRequired] },
];
function getValidatorsForField(fieldName) {
    const validators = [];
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
exports.getValidatorsForField = getValidatorsForField;
function validate(user) {
    const errors = {};
    for (const key in user) {
        if (user.hasOwnProperty(key)) {
            const value = user[key];
            const fieldValidators = getValidatorsForField(key);
            if (fieldValidators.length) {
                let error;
                for (const fieldValidator of fieldValidators) {
                    error = fieldValidator(value, user);
                    if (error)
                        break;
                }
                if (error) {
                    errors[key] = error;
                }
            }
        }
    }
    return errors;
}
exports.validate = validate;
// Generic validators
function validateRequired(value) {
    return (value === null || value === undefined || value === "") ? exports.REQUIRED : undefined;
}
exports.validateRequired = validateRequired;
function validateMaxLength50(value) {
    if (!value) {
        return undefined;
    }
    return value.length > 50 ? exports.MAX_LENGTH_50 : undefined;
}
exports.validateMaxLength50 = validateMaxLength50;
function validateMaxLength80(value) {
    if (!value) {
        return undefined;
    }
    return value.length > 80 ? exports.MAX_LENGTH_80 : undefined;
}
exports.validateMaxLength80 = validateMaxLength80;
function validateMaxLength255(value) {
    if (!value) {
        return undefined;
    }
    return value.length > 255 ? exports.MAX_LENGTH_500 : undefined;
}
exports.validateMaxLength255 = validateMaxLength255;
function validateMaxLength500(value) {
    if (!value) {
        return undefined;
    }
    return value.length > 500 ? exports.MAX_LENGTH_500 : undefined;
}
exports.validateMaxLength500 = validateMaxLength500;
function validateUrl(value) {
    if (!value) {
        return undefined;
    }
    return urlHelper_1.isUrl(value) ? undefined : exports.URL;
}
exports.validateUrl = validateUrl;
function validationRequiredIfDeveloper(value, user) {
    return (user.type === commonTypes.UserProfileType.DEVELOPER
        && (value === null || value === undefined || value === "" || ((value instanceof Array) && value.length === 0)))
        ? exports.REQUIRED
        : undefined;
}
exports.validationRequiredIfDeveloper = validationRequiredIfDeveloper;
// Specific validators
function validateSearchTags(value) {
    return (value === null || value === undefined || value === "" || value.length === 0) ? exports.REQUIRED_SEARCH_TAGS : undefined;
}
exports.validateSearchTags = validateSearchTags;
function validateSearchLocation(value) {
    return (value === null || value === undefined || value === "") ? exports.REQUIRED_SEARCH_LOCATION : undefined;
}
exports.validateSearchLocation = validateSearchLocation;
function validateInfoGroup(value) {
    if (!value) {
        return undefined;
    }
    for (const group of value) {
        if (!group.items || !group.items.length || group.items.length > 10) {
            return exports.ALL_GROUPS_MUST_HAVE_BETWEEN_1_AND_10_ITEMS;
        }
    }
    return undefined;
}
exports.validateInfoGroup = validateInfoGroup;
//# sourceMappingURL=fieldValidationHelper.js.map