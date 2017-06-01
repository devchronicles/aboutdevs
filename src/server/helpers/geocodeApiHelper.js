export const STREET_NUMBER_COMPONENT_TYPE = 'street_number';
export const STREET_COMPONENT_TYPE = 'route';
export const NEIGHBORHOOD_COMPONENT_TYPE = 'sublocality_level_1';
export const CITY_COMPONENT_TYPE = 'administrative_area_level_2';
export const STATE_COMPONENT_TYPE = 'administrative_area_level_1';
export const COUNTRY_COMPONENT_TYPE = 'administrative_area_level_1';

export function findLocationComponentByType(result, type) {
    if (result === null || result === undefined) throw Error('Argument \'result\' should be null or undefined');
    if (type === null || type === undefined) throw Error('Argument \'type\' should be null or undefined');

    const addressComponent = result.address_components.find(e => e.types.includes(type));
    return addressComponent;
}

export function getAddressInformationByType(key, type, result) {
    const addressComponent = findLocationComponentByType(result, type);
    return addressComponent ? addressComponent[key] : null;
}

export function getStreetNumber(result) {
    return getAddressInformationByType('short_name', STREET_NUMBER_COMPONENT_TYPE, result);
}

export function getStreetNumberComponent(result) {
    return findLocationComponentByType(result, STREET_NUMBER_COMPONENT_TYPE);
}

export function getStreet(result) {
    return getAddressInformationByType('long_name', STREET_COMPONENT_TYPE, result);
}

export function getStreetComponent(result) {
    return findLocationComponentByType(result, STREET_COMPONENT_TYPE);
}

export function getNeighborhood(result) {
    return getAddressInformationByType('short_name', NEIGHBORHOOD_COMPONENT_TYPE, result);
}

export function getNeighborhoodComponent(result) {
    return findLocationComponentByType(result, NEIGHBORHOOD_COMPONENT_TYPE);
}

export function getCity(result) {
    return getAddressInformationByType('long_name', CITY_COMPONENT_TYPE, result);
}

export function getCityComponent(result) {
    return findLocationComponentByType(result, CITY_COMPONENT_TYPE);
}

export function getState(result) {
    return getAddressInformationByType('short_name', STATE_COMPONENT_TYPE, result);
}

export function getStateComponent(result) {
    return findLocationComponentByType(result, STATE_COMPONENT_TYPE);
}

export function getCountry(result) {
    return getAddressInformationByType('long_name', COUNTRY_COMPONENT_TYPE, result);
}

export function getCountryComponent(result) {
    return findLocationComponentByType(result, COUNTRY_COMPONENT_TYPE);
}
