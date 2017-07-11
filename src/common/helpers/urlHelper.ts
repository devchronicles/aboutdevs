import * as stringHelper from './stringHelper';

export function normalizeUrlParameter(denormalizedParameter: string): string {
    if (!denormalizedParameter) {
        return denormalizedParameter;
    }
    let normalizedParameter = denormalizedParameter.toLowerCase();
    normalizedParameter = stringHelper.removeDiacritics(normalizedParameter);
    normalizedParameter = normalizedParameter.replace(/[,\s]+/g, '-');
    return normalizedParameter;
}

export function denormalizeUrlParameter(normalizedParameter: string): string {
    return normalizedParameter;
}
