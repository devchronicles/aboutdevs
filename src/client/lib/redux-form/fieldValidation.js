export const REQUIRED = 'required';
export const REQUIRED_IF_PROFESSIONAL = 'required-if-professional';
export const INVALID_PHONE = 'invalid-phone';
export const AT_LEAST_ONE_PHONE = 'at-least-one-phone';
export const MAX_LENGTH_50 = 'max-length-50';
export const MAX_LENGTH_80 = 'max-length-80';
export const MAX_LENGTH_500 = 'max-length-500';

export function validateRequired(value) {
    return (value === null || value === undefined || value === '') ? REQUIRED : undefined;
}

export function validateMaxLength50(value) {
    if (!value) return undefined;
    return value.length > 50 ? MAX_LENGTH_50 : undefined;
}

export function validateMaxLength80(value) {
    if (!value) return undefined;
    return value.length > 80 ? MAX_LENGTH_80 : undefined;
}

export function validateMaxLength500(value) {
    if (!value) return undefined;
    return value.length > 500 ? MAX_LENGTH_500 : undefined;
}

export function validationRequiredIfProfessional(value, values) {
    return (values.type === 0 && (value === null || value === undefined || value === '')) ? REQUIRED_IF_PROFESSIONAL : undefined;
}

export function validatePhone(value) {
    if (value === null || value === undefined || value === '') {
        return undefined;
    }
    return /\(\d{2}\)\s\d{3,5}-\d{4}/.test(value) ? undefined : INVALID_PHONE;
}

export function validateAtLeastOnePhone(value, values) {
    const invalidWhatsapp = values.whatsapp === null || values.whatsapp === undefined || values.whatsapp === '';
    const invalidAlternatePhone = values.alternatePhone === null || values.alternatePhone === undefined || values.alternatePhone === '';
    return invalidWhatsapp && invalidAlternatePhone ? AT_LEAST_ONE_PHONE : undefined;
}

