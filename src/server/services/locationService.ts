import axios from 'axios';
import * as massive from 'massive';
import config from '../../../config/config';
import * as serverTypes from '../../server/typings';
import * as geocodeApiFormattingHelper from '../helpers/geocodeApiFormattingHelper';
import * as geocodeApiHelper from '../helpers/geocodeApiHelper';
import * as searchHelper from '../helpers/searchHelper';

/**
 * Saves the given {search, location} to the cache and returns the location if everything goes fine
 * @param {string} searchTerm The search term the user typed
 * @param {object} location The location to be saved in the cache
 * @param {object} db The db object
 */
async function saveLocationToCache(searchTerm: string, location: serverTypes.GeocodeApiResult, db: serverTypes.IndieJobsDatabase)
    : Promise<serverTypes.GeocodeApiResult> {
    if (searchTerm === null || searchTerm === undefined) throw Error('Argument \'search\' should be null or undefined');
    if (location === null || location === undefined) throw Error('Argument \'location\' should be null or undefined');

    const insertedLocation = (await db.geo_location_cache.insert({ search: searchTerm, cache: location })) as serverTypes.GeoLocationCache;
    return insertedLocation ? insertedLocation.cache : undefined;
}

/**
 * Returns the location from the cache, if it exists, or undefined, otherwise
 * @param {string} searchTerm The search term the user typed
 * @param {object} db The db object
 */
export function getLocationsFromCache(searchTerm: string, db: serverTypes.IndieJobsDatabase)
    : Promise<serverTypes.GeocodeApiResult> {
    if (searchTerm === null || searchTerm === undefined) throw Error('Argument \'partialAddress\' should be null or undefined');
    return db.geo_location_cache.findOne({ search: searchTerm })
        .then((r) => (r ? r.cache : undefined));
}

/**
 * Returns the location from Google, if it exists, or an object with an empty "results" array, otherwise
 * @param {string} searchTerm The search term the user typed
 */
export async function getLocationsFromGoogle(searchTerm: string): Promise<serverTypes.GeocodeApiResult> {
    if (searchTerm === null || searchTerm === undefined) throw Error('Argument \'partialAddress\' should be null or undefined');
    const encodedLocation = encodeURIComponent(searchTerm);
    const key: string = config.google.geocodeApiKey;
    const googleGeoCodeApiAdress
        = `https://maps.google.com/maps/api/geocode/json?address=${encodedLocation}&components=country:BR&key=${key}`;

    const res = await axios.get(googleGeoCodeApiAdress);
    if (res.data.errorMessage) {
        throw Error(res.data.errorMessage);
    }
    return res.data;
}

export async function getLocations(searchTerm: string, allowCities: boolean, db: serverTypes.IndieJobsDatabase)
    : Promise<serverTypes.GeocodeApiResult> {
    const normalizedSearchTerm = searchHelper.normalize(searchTerm);
    if (!normalizedSearchTerm) {
        return Promise.resolve<serverTypes.GeocodeApiResult>(undefined);
    }

    let locations = await getLocationsFromCache(normalizedSearchTerm, db);
    if (locations) {
        return locations;
    }
    locations = await getLocationsFromGoogle(normalizedSearchTerm);
    await saveLocationToCache(normalizedSearchTerm, locations, db);
    return locations;
}

export async function getFormattedLocations(searchTerm: string, allowCities: boolean, db: serverTypes.IndieJobsDatabase): Promise<string[]> {
    const locations = await getLocations(searchTerm, allowCities, db);
    const formattedLocations = await geocodeApiFormattingHelper.getFormattedLocations(locations, allowCities);
    return formattedLocations;
}

export async function saveLocation(db: serverTypes.IndieJobsDatabase, formattedText: string): Promise<serverTypes.GeoLocation> {
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
        country = (await db.geo_location_country.insert({ short_name: countryComponent.short_name, long_name: countryComponent.long_name })) as serverTypes.GeoLocationCountry;
    }

    // saving state
    let state = await db.geo_location_state.findOne({ short_name: stateComponent.short_name });
    if (!state) {
        state = (await db.geo_location_state.insert({
            geo_location_country_id: country.id,
            long_name: countryComponent.long_name,
            short_name: countryComponent.short_name,
        })) as serverTypes.GeoLocationState;
    }

    // saving city
    let city = await db.geo_location_city.findOne({ short_name: cityComponent.short_name });
    if (!city) {
        city = (await db.geo_location_city.insert({
            short_name: cityComponent.short_name,
            geo_location_state_id: state.id,
        })) as serverTypes.GeoLocationCity;
    }

    location = (await db.geo_location.insert({
        formatted_address: formattedText,
        geo_location_city_id: city.id,
        sub_locality: neighborhoodComponent.short_name,
    })) as serverTypes.GeoLocation;

    return location;
}

export async function getFormattedLocationById(db: serverTypes.IndieJobsDatabase, geoLocationId: number) {
    if (!db) throw Error('Argument \'db\' should be truthy');
    if (!geoLocationId) throw Error('Argument \'geoLocationId\' should be truthy');

    const location = await db.geo_location.findOne({ id: geoLocationId });
    if (!location) throw Error('could not find location');
    return location.formatted_address;
}
