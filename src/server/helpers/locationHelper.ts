import axios from 'axios';
import * as massive from 'massive';
import config from '../../../config/config';
import * as dbTypes from '../typings/dbTypes';
import * as googleGeocodeTypes from '../typings/googleGeocodeTypes';
import * as geocodeApiFormattingHelper from './geocodeApiFormattingHelper';
import * as geocodeApiHelper from './geocodeApiHelper';
import * as searchHelper from './searchHelper';

/**
 * Saves the given {search, location} to the cache and returns the location if everything goes fine
 * @param {string} searchTerm The search term the user typed
 * @param {object} location The location to be saved in the cache
 * @param {object} db The db object
 */
function saveLocationToCache(searchTerm: string, location: googleGeocodeTypes.IGeocodeApiResult, db: dbTypes.IIndieJobsDatabase)
    : Promise<googleGeocodeTypes.IGeocodeApiResult> {
    if (searchTerm === null || searchTerm === undefined) throw Error('Argument \'search\' should be null or undefined');
    if (location === null || location === undefined) throw Error('Argument \'location\' should be null or undefined');

    return db.geo_location_cache.save({ search: searchTerm, cache: location })
        .then((lc) => lc && lc.length ? lc[0].cache : undefined);
}

/**
 * Returns the location from the cache, if it exists, or undefined, otherwise
 * @param {string} searchTerm The search term the user typed
 * @param {object} db The db object
 */
export function getLocationsFromCache(searchTerm: string, db: dbTypes.IIndieJobsDatabase)
    : Promise<googleGeocodeTypes.IGeocodeApiResult> {
    if (searchTerm === null || searchTerm === undefined) throw Error('Argument \'partialAddress\' should be null or undefined');
    return db.geo_location_cache.findOne({ search: searchTerm })
        .then((r) => (r ? r.cache : undefined));
}

/**
 * Returns the location from Google, if it exists, or an object with an empty "results" array, otherwise
 * @param {string} searchTerm The search term the user typed
 */
export function getLocationsFromGoogle(searchTerm: string)
    : Promise<googleGeocodeTypes.IGeocodeApiResult> {
    if (searchTerm === null || searchTerm === undefined) throw Error('Argument \'partialAddress\' should be null or undefined');
    const encodedLocation = encodeURIComponent(searchTerm);
    const key: string = config.google.geocodeApiKey;
    const googleGeoCodeApiAdress
        = `https://maps.google.com/maps/api/geocode/json?address=${encodedLocation}&components=country:BR&key=${key}`;

    return axios.get(googleGeoCodeApiAdress)
        .then((res) => { if (res.data.errorMessage) { throw Error(res.data.errorMessage); } return res; })
        .then((res) => res.data);
}

export function getLocations(searchTerm: string, allowCities: boolean, db: dbTypes.IIndieJobsDatabase)
    : Promise<googleGeocodeTypes.IGeocodeApiResult> {
    const normalizedSearchTerm = searchHelper.normalize(searchTerm);
    if (!normalizedSearchTerm) {
        return Promise.resolve<googleGeocodeTypes.IGeocodeApiResult>(undefined);
    }
    return getLocationsFromCache(normalizedSearchTerm, db)
        .then((lc) => (lc || getLocationsFromGoogle(normalizedSearchTerm)
            .then((lg) => saveLocationToCache(normalizedSearchTerm, lg, db))))
}

export function getFormattedLocations(searchTerm: string, allowCities: boolean, db: dbTypes.IIndieJobsDatabase): Promise<string[]> {
    return getLocations(searchTerm, allowCities, db)


        .then((r) => geocodeApiFormattingHelper.getFormattedLocations(r, allowCities));
}

export async function saveLocation(db: dbTypes.IIndieJobsDatabase, formattedText: string): Promise<dbTypes.IGeoLocation[]> {
    const locationData = await getLocations(formattedText, false, db);
    if (!locationData || !locationData.results || !locationData.results.length) throw Error('could not get location');
    if (locationData.results.length > 1) throw Error('the given location is not unique');

    const location = await db.geo_location.findOne({ formatted_address: formattedText });
    if (location) return [location];

    const locationDataResult = locationData.results[0];
    const countryComponent = geocodeApiHelper.getCountryComponent(locationDataResult);
    const stateComponent = geocodeApiHelper.getStateComponent(locationDataResult);
    const cityComponent = geocodeApiHelper.getCityComponent(locationDataResult);
    const neighborhoodComponent = geocodeApiHelper.getNeighborhoodComponent(locationDataResult);

    // saving country
    let country = await db.geo_location_country.findOne({ short_name: countryComponent.short_name });
    if (!country) {
        const insertedCountres = await db.geo_location_country.insert({ short_name: countryComponent.short_name, long_name: countryComponent.long_name });
        country = insertedCountres[0];
    }

    // saving state
    let state = await db.geo_location_state.findOne({ short_name: stateComponent.short_name });
    if (!state) {
        const insertedStates = await db.geo_location_state.insert({
            geo_location_country_id: country.id,
            long_name: countryComponent.long_name,
            short_name: countryComponent.short_name,
        });
        state = insertedStates[0];
    }

    // saving city
    let city = await db.geo_location_city.findOne({ short_name: cityComponent.short_name });
    if (!city) {
        const insertedCities = await db.geo_location_city.insert({ short_name: cityComponent.short_name, geo_location_state_id: state.id });
        city = insertedCities[0];
    }

    return db.geo_location.insert({
        formatted_address: formattedText,
        geo_location_city_id: city.id,
        sub_locality: neighborhoodComponent.short_name,
    });
}

export async function getFormattedLocationById(db: dbTypes.IIndieJobsDatabase, geoLocationId: number) {
    if (!db) throw Error('Argument \'db\' should be truthy');
    if (!geoLocationId) throw Error('Argument \'geoLocationId\' should be truthy');

    const location = await db.geo_location.findOne({ id: geoLocationId });
    if (!location) throw Error('could not find location');
    return location.formatted_address;
}
