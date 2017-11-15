import * as stringHelper from './stringHelper';
import * as commonTypes from '../typings/commonTypes';

export function getSearchDisplayFromUrlParameter(parameter: string): commonTypes.SearchDisplay {
    switch (parameter) {
        case 'melhores-2km':
            return commonTypes.SearchDisplay.BEST_PROFESSIONAIS_IN_2_KM;
        case 'melhores-5km':
            return commonTypes.SearchDisplay.BEST_PROFESSIONAIS_IN_5_KM;
        case 'melhores-10km':
            return commonTypes.SearchDisplay.BEST_PROFESSIONAIS_IN_10_KM;
    }
}

export function getProfessionalsSearchUrl(search: string, location: string, display?: commonTypes.SearchDisplay) {
    switch (display) {
        case commonTypes.SearchDisplay.ORDER_BY_DISTANCE:
            return `/s/${location}/${search}`;
        case commonTypes.SearchDisplay.BEST_PROFESSIONAIS_IN_2_KM:
            return `/s/${location}/${search}/melhores-2km`;
        case commonTypes.SearchDisplay.BEST_PROFESSIONAIS_IN_5_KM:
            return `/s/${location}/${search}/melhores-5km`;
        case commonTypes.SearchDisplay.BEST_PROFESSIONAIS_IN_10_KM:
            return `/s/${location}/${search}/melhores-10km`;
    }
}

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
