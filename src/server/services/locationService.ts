import axios from "axios";
import config from "../../../config/config";
import * as serverTypes from "../../server/typings";
import * as geocodeApiFormattingHelper from "../helpers/geocodeApiFormattingHelper";
import * as geocodeApiHelper from "../helpers/geocodeApiHelper";
import * as stringHelper from "../../common/helpers/stringHelper";

/**
 * Saves the given {search, location} to the cache and returns the location if everything goes fine
 * @param {string} searchTerm The search term the user typed
 * @param {object} location The location to be saved in the cache
 * @param {object} db The db object
 */
async function saveLocationToCache(searchTerm: string, location: serverTypes.GeocodeApiResult, db: serverTypes.AboutDevsDatabase): Promise<serverTypes.GeocodeApiResult> {
    if (searchTerm === null || searchTerm === undefined) throw Error("Argument 'search' should be null or undefined");
    if (location === null || location === undefined) throw Error("Argument 'location' should be null or undefined");

    // this should be a in a transaction
    const locations = await getLocationsFromCache(searchTerm, db);
    if (!locations) {
        const insertedLocation = (await db.geo_location_cache.insert({
            search: searchTerm,
            cache: location,
        })) as serverTypes.GeoLocationCache;
        return insertedLocation ? insertedLocation.cache : undefined;
    }
    return undefined;
}

/**
 * Returns the location from the cache, if it exists, or undefined, otherwise
 * @param {string} searchTerm The search term the user typed
 * @param {object} db The db object
 */
export function getLocationsFromCache(searchTerm: string, db: serverTypes.AboutDevsDatabase): Promise<serverTypes.GeocodeApiResult> {
    if (searchTerm === null || searchTerm === undefined) throw Error("Argument 'partialAddress' should be null or undefined");
    return db.geo_location_cache.findOne({search: searchTerm})
        .then((r) => (r ? r.cache : undefined));
}

/**
 * Returns the location from Google, if it exists, or an object with an empty "results" array, otherwise
 * @param {string} searchTerm The search term the user typed
 */
export async function getLocationsFromGoogle(searchTerm: string): Promise<serverTypes.GeocodeApiResult> {
    if (searchTerm === null || searchTerm === undefined) throw Error("Argument 'partialAddress' should be null or undefined");
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

export async function searchLocations(db: serverTypes.AboutDevsDatabase, searchTerm: string, allowCities: boolean): Promise<serverTypes.GeocodeApiResult> {
    const normalizedSearchTerm = stringHelper.normalizeForSearch(searchTerm);
    if (!normalizedSearchTerm) {
        return Promise.resolve<serverTypes.GeocodeApiResult>(undefined);
    }

    let locations = await getLocationsFromCache(normalizedSearchTerm, db);
    if (locations) {
        return locations;
    }
    locations = await getLocationsFromGoogle(normalizedSearchTerm);
    try {
        await saveLocationToCache(normalizedSearchTerm, locations, db);
    } catch (ex) {
        // TODO: Fix this.
    }
    return locations;
}

export async function getFormattedLocations(db: serverTypes.AboutDevsDatabase, searchTerm: string, allowCities: boolean): Promise<string[]> {
    const locations = await searchLocations(db, searchTerm, allowCities);
    const formattedLocations = await geocodeApiFormattingHelper.getFormattedLocations(locations, allowCities);
    return formattedLocations;
}

export async function saveCountry(db: serverTypes.AboutDevsDatabase, shortName: string, longName: string): Promise<serverTypes.GeoLocationCountry> {
    let country = await db.geo_location_country.findOne({short_name: shortName});
    if (!country) {
        country = (await db.geo_location_country.insert({
            short_name: shortName,
            long_name: longName,
        })) as serverTypes.GeoLocationCountry;
    }
    return country;
}

export async function saveState(db: serverTypes.AboutDevsDatabase, shortName: string, longName: string, countryId: number): Promise<serverTypes.GeoLocationState> {
    let state = await db.geo_location_state.findOne({short_name: shortName});
    if (!state) {
        state = (await db.geo_location_state.insert({
            geo_location_country_id: countryId,
            short_name: shortName,
            long_name: longName,
        })) as serverTypes.GeoLocationState;
    }
    return state;
}

export async function saveCity(db: serverTypes.AboutDevsDatabase, shortName: string, stateId: number): Promise<serverTypes.GeoLocationCity> {
    let city = await db.geo_location_city.findOne({short_name: shortName});
    if (!city) {
        city = (await db.geo_location_city.insert({
            short_name: shortName,
            geo_location_state_id: stateId,
        })) as serverTypes.GeoLocationCity;
    }
    return city;
}

export async function saveLocation(db: serverTypes.AboutDevsDatabase, formattedAddress: string, neighborhood: string, cityId: number, latitude: number, longitude: number): Promise<serverTypes.GeoLocation> {
    const location = (await db.geo_location.insert({
        formatted_address: formattedAddress,
        geo_location_city_id: cityId,
        sub_locality: neighborhood,
        longitude,
        latitude,
    })) as serverTypes.GeoLocation;
    await db.update_geometry(location.id, longitude, latitude);
    return location;
}

export async function saveAddress(db: serverTypes.AboutDevsDatabase, formattedText: string): Promise<serverTypes.GeoLocation> {
    const locationData = await searchLocations(db, formattedText, false);
    if (!locationData || !locationData.results || !locationData.results.length) throw Error("could not get location");
    if (locationData.results.length > 1) throw Error("the given location is not unique");

    let location = await db.geo_location.findOne({formatted_address: formattedText});
    if (location) return location;

    const locationDataResult = locationData.results[0];
    const countryComponent = geocodeApiHelper.getCountryComponent(locationDataResult);
    const stateComponent = geocodeApiHelper.getStateComponent(locationDataResult);
    const cityComponent = geocodeApiHelper.getCityComponent(locationDataResult);
    const neighborhoodComponent = geocodeApiHelper.getNeighborhoodComponent(locationDataResult);
    const {longitude, latitude} = geocodeApiHelper.getLongitudeLatitude(locationDataResult);

    const country = await saveCountry(db, countryComponent.short_name, countryComponent.long_name);
    const state = await saveState(db, stateComponent.short_name, stateComponent.long_name, country.id);
    const city = await saveCity(db, cityComponent.short_name, state.id);

    location = await saveLocation(db, formattedText, neighborhoodComponent.short_name, city.id, latitude, longitude);

    return location;
}

export async function getFormattedLocationById(db: serverTypes.AboutDevsDatabase, geoLocationId: number) {
    if (!db) throw Error("Argument 'db' should be truthy");
    if (!geoLocationId) throw Error("Argument 'geoLocationId' should be truthy");

    const location = await db.geo_location.findOne({id: geoLocationId});
    if (!location) throw Error("could not find location");
    return location.formatted_address;
}
