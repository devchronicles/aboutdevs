import * as stringHelper from './stringHelper';

export function normalize(search) {
    if (!search) {
        return '';
    }
    let normalizedSearch = search;
    normalizedSearch = normalizedSearch.toLowerCase();
    normalizedSearch = stringHelper.removeDiacritics(normalizedSearch);
    normalizedSearch = stringHelper.replaceNonAlphaNumericCharactersWithSpaces(normalizedSearch);
    normalizedSearch = stringHelper.normalizeSpaces(normalizedSearch);
    normalizedSearch = normalizedSearch.trim();
    return normalizedSearch;
}

export function convertToTsVector(search) {
    if (!search) {
        return '';
    }
    return search.split(' ').join(' & ');
}
