import * as geocodeTypes from '../typings/googleGeocodeTypes';

export const STREET_NUMBER_COMPONENT_TYPE = 'street_number';
export const STREET_COMPONENT_TYPE = 'route';
export const NEIGHBORHOOD_COMPONENT_TYPE = 'sublocality_level_1';
export const CITY_COMPONENT_TYPE = 'administrative_area_level_2';
export const STATE_COMPONENT_TYPE = 'administrative_area_level_1';
export const COUNTRY_COMPONENT_TYPE = 'country';

export function findLocationComponentByType(result: geocodeTypes.IResult, type: string): geocodeTypes.IAddressComponent {
    if (result === null || result === undefined) throw Error('Argument \'result\' should be null or undefined');
    if (type === null || type === undefined) throw Error('Argument \'type\' should be null or undefined');

    return result.address_components.find((e) => e.types.includes(type));
}

export function getAddressInformationShortNameByType(type: string, result: geocodeTypes.IResult) {
    const addressComponent = findLocationComponentByType(result, type);
    return addressComponent ? addressComponent.short_name : null;
}

export function getAddressInformationLongNameByType(type: string, result: geocodeTypes.IResult) {
    const addressComponent = findLocationComponentByType(result, type);
    return addressComponent ? addressComponent.long_name : null;
}

export function getStreetNumber(result: geocodeTypes.IResult) {
    return getAddressInformationShortNameByType(STREET_NUMBER_COMPONENT_TYPE, result);
}

export function getStreetNumberComponent(result: geocodeTypes.IResult) {
    return findLocationComponentByType(result, STREET_NUMBER_COMPONENT_TYPE);
}

export function getStreet(result: geocodeTypes.IResult) {
    return getAddressInformationLongNameByType(STREET_COMPONENT_TYPE, result);
}

export function getStreetComponent(result: geocodeTypes.IResult) {
    return findLocationComponentByType(result, STREET_COMPONENT_TYPE);
}

export function getNeighborhood(result: geocodeTypes.IResult) {
    return getAddressInformationShortNameByType(NEIGHBORHOOD_COMPONENT_TYPE, result);
}

export function getNeighborhoodComponent(result: geocodeTypes.IResult) {
    return findLocationComponentByType(result, NEIGHBORHOOD_COMPONENT_TYPE);
}

export function getCity(result: geocodeTypes.IResult) {
    return getAddressInformationLongNameByType(CITY_COMPONENT_TYPE, result);
}

export function getCityComponent(result: geocodeTypes.IResult) {
    return findLocationComponentByType(result, CITY_COMPONENT_TYPE);
}

export function getState(result: geocodeTypes.IResult) {
    return getAddressInformationShortNameByType(STATE_COMPONENT_TYPE, result);
}

export function getStateComponent(result: geocodeTypes.IResult) {
    return findLocationComponentByType(result, STATE_COMPONENT_TYPE);
}

export function getCountry(result: geocodeTypes.IResult) {
    return getAddressInformationLongNameByType(COUNTRY_COMPONENT_TYPE, result);
}

export function getCountryComponent(result: geocodeTypes.IResult) {
    return findLocationComponentByType(result, COUNTRY_COMPONENT_TYPE);
}
