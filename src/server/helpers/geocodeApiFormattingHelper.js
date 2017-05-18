/**
 * Validates if the result corresponds to a valid address.
 */
function validateResult(allowCities = false) {
    const minimumAddressComponentType = allowCities ? 'administrative_area_level_2' : 'route';
    return r => r.address_components.filter(c => c.types.includes(minimumAddressComponentType)).length > 0;
}

function findAddressComponentByType(result, type) {
    if (result === null || result === undefined) throw Error('Argument \'result\' should be null or undefined');
    if (type === null || type === undefined) throw Error('Argument \'type\' should be null or undefined');

    const addressComponent = result.address_components.find(e => e.types.includes(type));
    return addressComponent;
}

function getAddressInformationByType(key, type, result) {
    const addressComponent = findAddressComponentByType(result, type);
    return addressComponent ? addressComponent[key] : null;
}

function getStreet(result) {
    return getAddressInformationByType('long_name', 'route', result);
}

function getStreetNumber(result) {
    return getAddressInformationByType('short_name', 'street_number', result);
}

function getNeighborhood(result) {
    return getAddressInformationByType('short_name', 'sublocality_level_1', result);
}

function getCity(result) {
    return getAddressInformationByType('long_name', 'administrative_area_level_2', result);
}

function getState(result) {
    return getAddressInformationByType('short_name', 'administrative_area_level_1', result);
}

function getFriendlyAddress(result) {
    const addressComponents = [
        getStreet(result),
        getStreetNumber(result),
        getNeighborhood(result),
        getCity(result),
        getState(result)
    ].filter(v => v);
    return addressComponents.join(', ');
}

export function getFormattedAddresses(data, allowCities = false) {
    if (!data || !data.results || !data.results.length) return [];
    return data.results.filter(validateResult(allowCities)).map(getFriendlyAddress);
}
