import * as fieldValidation from "./fieldValidationHelper";

export function getErrorMessage(error: string) {
    switch (error) {
        // Generic
        case fieldValidation.REQUIRED:
            return "Required.";
        case fieldValidation.MAX_LENGTH_50:
            return "Max size: 50 characters.";
        case fieldValidation.MAX_LENGTH_80:
            return "Max size: 80 characters.";
        case fieldValidation.MAX_LENGTH_255:
            return "Max size: 255 characters.";
        case fieldValidation.MAX_LENGTH_500:
            return "Max size: 500 characters.";
        case fieldValidation.USER_NAME_IS_TAKEN:
            return "This name is taken.";
        case fieldValidation.URL:
            return "Invalid URL.";
        // Specific
        case fieldValidation.REQUIRED_SEARCH_TAGS:
            return "Please specify the technologies";
        case fieldValidation.REQUIRED_SEARCH_LOCATION:
            return "Please specify the location";
        case fieldValidation.ALL_GROUPS_MUST_HAVE_BETWEEN_1_AND_10_ITEMS:
            return "Every group should have between 1 and 10 items.";
        default:
            return error ? "Invalid value." : null;
    }
}
