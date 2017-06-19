import * as stringHelper from '../../common/helpers/stringHelper';

export function normalize(search: string, ranc = true, rd = true, ns = true, lc = true) {
    if (!search) {
        return '';
    }
    let normalizedSearch = search;
    normalizedSearch = lc ? normalizedSearch.toLowerCase() : normalizedSearch;
    normalizedSearch = rd ? stringHelper.removeDiacritics(normalizedSearch) : normalizedSearch;
    normalizedSearch = ranc ? stringHelper.replaceNonAlphaNumericCharactersWithSpaces(normalizedSearch) : normalizedSearch;
    normalizedSearch = ns ? stringHelper.normalizeSpaces(normalizedSearch) : normalizedSearch;
    normalizedSearch = normalizedSearch.trim();
    return normalizedSearch;
}

export function convertToTsVector(search: string) {
    if (!search) {
        return '';
    }
    return search.split(' ').join(' & ');
}
