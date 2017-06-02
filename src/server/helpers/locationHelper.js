import axios from 'axios';
import * as geocodeApiHelper from './geocodeApiHelper';
import * as geocodeApiFormattingHelper from './geocodeApiFormattingHelper';
import config from '../../../config/config';
import * as searchHelper from './searchHelper';

/**
 * Saves the given {search, location} to the cache and returns the location if everything goes fine
 * @param {string} searchTerm The search term the user typed
 * @param {object} location The location to be saved in the cache
 * @param {object} db The db object
 */
function saveLocationToCache(searchTerm, location, db) {
    if (searchTerm === null || searchTerm === undefined) throw Error('Argument \'search\' should be null or undefined');
    if (location === null || location === undefined) throw Error('Argument \'location\' should be null or undefined');

    return db.geo_location_cache.save({ search: searchTerm, cache: location })
        .then(() => location);
}


/**
 * Returns the location from the cache, if it exists, or undefined, otherwise
 * @param {string} searchTerm The search term the user typed
 * @param {object} db The db object
 */
export function getLocationsFromCache(searchTerm, db) {
    if (searchTerm === null || searchTerm === undefined) throw Error('Argument \'partialAddress\' should be null or undefined');
    return db.geo_location_cache.findOne({ search: searchTerm })
        .then(r => (r ? r.cache : undefined));
}

/**
 * Returns the location from Google, if it exists, or an object with an empty "results" array, otherwise
 * @param {string} searchTerm The search term the user typed
 */
export function getLocationsFromGoogle(searchTerm) {
    if (searchTerm === null || searchTerm === undefined) throw Error('Argument \'partialAddress\' should be null or undefined');
    const encodedLocation = encodeURIComponent(searchTerm);
    const key = config.google.geocodeApiKey;
    const googleGeoCodeApiAdress
        = `https://maps.google.com/maps/api/geocode/json?address=${encodedLocation}&components=country:BR&key=${key}`;

    return axios.get(googleGeoCodeApiAdress)
        .then((res) => { if (res.data.errorMessage) { throw Error(res.data.errorMessage); } return res; })
        .then(res => res.data);
}

export function getLocations(searchTerm, allowCities, db) {
    const normalizedSearchTerm = searchHelper.normalize(searchTerm);
    if (!normalizedSearchTerm) {
        return Promise.resolve([]);
    }
    return getLocationsFromCache(normalizedSearchTerm, db)
        .then(lc => (lc || getLocationsFromGoogle(normalizedSearchTerm).then(lg => saveLocationToCache(normalizedSearchTerm, lg, db))));
}

export function getFormattedLocations(searchTerm, allowCities, db) {
    return getLocations(searchTerm, allowCities, db)
        .then(r => geocodeApiFormattingHelper.getFormattedLocations(r, allowCities));
}

export async function saveLocation(db, formattedText) {
    const locationData = await getLocations(formattedText, false, db);
    if (!locationData || !locationData.results || !locationData.results.length) throw Error('could not get location');
    if (locationData.results.length > 1) throw Error('the given location is not unique');

    let location = await db.geo_location.findOne({ formatted_address: formattedText });
    if (location) return location;

    const locationDataResult = locationData.results[0];
    const countryComponent = geocodeApiHelper.getCountryComponent(locationDataResult);
    const stateComponent = geocodeApiHelper.getStateComponent(locationDataResult);
    const cityComponent = geocodeApiHelper.getCityComponent(locationDataResult);
    const neighborhoodComponent = geocodeApiHelper.getNeighborhoodComponent(locationDataResult);

    // saving country
    let country = await db.geo_location_country.findOne({ short_name: countryComponent.short_name });
    if (!country) {
        country = await db.geo_location_country.insert({ short_name: countryComponent.short_name, long_name: countryComponent.long_name });
    }

    // saving state
    let state = await db.geo_location_state.findOne({ short_name: stateComponent.short_name });
    if (!state) {
        state = await db.geo_location_state.insert({ short_name: countryComponent.short_name, long_name: countryComponent.long_name, geo_location_country_id: country.id });
    }

    // saving city
    let city = await db.geo_location_city.findOne({ short_name: cityComponent.short_name });
    if (!city) {
        city = await db.geo_location_city.insert({ short_name: cityComponent.short_name, geo_location_state_id: state.id });
    }

    location = db.geo_location.insert({
        geo_location_city_id: city.id,
        formatted_address: formattedText,
        sub_locality: neighborhoodComponent.short_name
    });
    return location;
}
