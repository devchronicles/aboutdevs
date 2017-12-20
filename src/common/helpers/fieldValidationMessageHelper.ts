import * as fieldValidation from "./fieldValidationHelper";

export function getErrorMessage(error: string) {
    switch (error) {
        case fieldValidation.REQUIRED:
            return "Required.";
        case fieldValidation.MAX_LENGTH_50:
            return "Max size: 50 characters.";
        case fieldValidation.MAX_LENGTH_60:
            return "Max size: 60 characters.";
        case fieldValidation.MAX_LENGTH_80:
            return "Max size: 80 characters.";
        case fieldValidation.MAX_LENGTH_500:
            return "Max size: 500 characters.";
        case fieldValidation.USER_NAME_IS_TAKEN:
            return "This name is taken.";
        case fieldValidation.URL:
            return "Invalid URL";
        default:
            return error ? "Invalid value" : null;
    }
}
