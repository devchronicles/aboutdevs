export function findAddressComponentByType(result, type) {
    if (result === null || result === undefined) throw Error('Argument \'result\' should be null or undefined');
    if (type === null || type === undefined) throw Error('Argument \'type\' should be null or undefined');

    const addressComponent = result.address_components.find(e => e.types.includes(type));
    return addressComponent;
}

export function getAddressInformationByType(key, type, result) {
    const addressComponent = findAddressComponentByType(result, type);
    return addressComponent ? addressComponent[key] : null;
}

export function getStreet(result) {
    return getAddressInformationByType('long_name', 'route', result);
}

export function getStreetNumber(result) {
    return getAddressInformationByType('short_name', 'street_number', result);
}

export function getNeighborhood(result) {
    return getAddressInformationByType('short_name', 'sublocality_level_1', result);
}

export function getCity(result) {
    return getAddressInformationByType('long_name', 'administrative_area_level_2', result);
}

export function getState(result) {
    return getAddressInformationByType('short_name', 'administrative_area_level_1', result);
}
