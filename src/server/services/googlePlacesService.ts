import axios from "axios";
import config from "../../../config/config";
import * as serverTypes from "../../server/typings";
import * as geocodeApiHelper from "../helpers/geocodeApiHelper";
import * as stringHelper from "../../common/helpers/stringHelper";
import {
    formatAddress, getDataFromFormattedAddress,
    validateFormattedAddress,
} from "../../common/helpers/googlePlacesFormatHelper";

/**
 * Saves the given {search, location} to the cache and returns the location if everything goes fine
 * @param {string} searchTerm The search term the user typed
 * @param {object} citySearchCache The location to be saved in the cache
 * @param {object} db The db object
 */
async function saveCitySearchToCache(db: serverTypes.AboutDevsDatabase, searchTerm: string, citySearchCache: serverTypes.GooglePlacesTextSearchApiResult): Promise<void> {
    if (searchTerm === null || searchTerm === undefined) throw Error("Argument 'search' should be null or undefined");
    if (citySearchCache === null || citySearchCache === undefined) throw Error("Argument 'location' should be null or undefined");

    // this should be a in a transaction
    const cities = await searchCitiesFromCache(db, searchTerm);
    if (!cities) {
        await db.google_places_textsearch_cache.insert({
            search: searchTerm,
            cache: citySearchCache,
        });
    }
}

async function saveCityDetailsToCache(db: serverTypes.AboutDevsDatabase, placeId: string, cityDetails: serverTypes.GooglePlacesDetailsApiResult): Promise<serverTypes.GooglePlace> {
    if (!db) throw Error("Argument is null or undefined. Argument: db");
    if (!placeId) throw Error("Argument is null or undefined. Argument: placeId");
    if (!cityDetails) throw Error("Argument is null or undefined. Argument: cityDetails");
    if (!cityDetails.result) throw Error("Argument is null or undefined. Argument: cityDetails.result");

    let googlePlace = await db.google_place.findOne({google_place_id: placeId});
    if (!googlePlace) {
        const cityData = cityDetails.result;
        const {longitude, latitude} = geocodeApiHelper.getLongitudeLatitude(cityData.geometry);
        googlePlace = await db.google_place.insert({
            formatted_address: formatAddress(placeId, cityData.formatted_address),
            longitude,
            latitude,
            google_place_id: placeId,
            google_place_details: cityData,
        });
        await db._aboutdevs_update_geometry(googlePlace.id, longitude, latitude);
    }
    return googlePlace;
}

export async function searchCitiesFromCache(db: serverTypes.AboutDevsDatabase, searchTerm: string): Promise<serverTypes.GooglePlacesTextSearchApiResult> {
    if (!db) throw Error("Argument is null or undefined. Argument: db");
    if (!searchTerm) throw Error("Argument is null or undefined. Argument: searchTerm");

    const result = await db.google_places_textsearch_cache.findOne({search: searchTerm});
    return result ? result.cache : undefined;
}

export async function searchCitiesFromGoogle(searchTerm: string): Promise<serverTypes.GooglePlacesTextSearchApiResult> {
    if (!searchTerm) throw Error("Argument is null or undefined. Argument: searchTerm");

    const encodedLocation = encodeURIComponent(searchTerm);
    const key: string = config.google.geocodeApiKey;
    const googleApiUrl
        = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodedLocation}&key=${key}&type=regions`;

    const res = await axios.get(googleApiUrl);
    if (res.data.errorMessage) {
        throw Error(res.data.errorMessage);
    }
    return res.data;
}

export async function getCityDetailsFromGoogle(placeId: string): Promise<serverTypes.GooglePlacesDetailsApiResult> {
    if (!placeId) throw Error("Argument is null or undefined. Argument: searchTerm");

    const key: string = config.google.geocodeApiKey;
    const googleApiUrl
        = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${key}`;

    const res = await axios.get(googleApiUrl);
    if (res.data.errorMessage) {
        throw Error(res.data.errorMessage);
    }
    return res.data;
}

export async function getAndSaveCity(db: serverTypes.AboutDevsDatabase, formattedAddress: string): Promise<serverTypes.GooglePlace> {
    if (!db) throw Error("Argument is null or undefined. Argument: db");
    if (!formattedAddress) throw Error("Argument is null or undefined. Argument: formattedAddress");
    if (!validateFormattedAddress(formattedAddress)) throw Error(`Address is not formatted. Address: ${formattedAddress}`);

    const {placeId} = getDataFromFormattedAddress(formattedAddress);

    let googlePlace = await db.google_place.findOne({google_place_id: placeId});

    if (!googlePlace) {
        const cityDetails = await getCityDetailsFromGoogle(placeId);
        googlePlace = await saveCityDetailsToCache(db, placeId, cityDetails);
    }
    return googlePlace;
}

export async function searchCities(db: serverTypes.AboutDevsDatabase, searchTerm: string): Promise<serverTypes.GooglePlacesTextSearchApiResult> {
    const normalizedSearchTerm = stringHelper.normalizeForSearch(searchTerm);
    if (!normalizedSearchTerm) {
        return Promise.resolve<serverTypes.GooglePlacesTextSearchApiResult>(undefined);
    }

    let cities = await searchCitiesFromCache(db, normalizedSearchTerm);
    if (cities) {
        return cities;
    }
    cities = await searchCitiesFromGoogle(normalizedSearchTerm);
    await saveCitySearchToCache(db, normalizedSearchTerm, cities);

    return cities;
}

export async function searchCitiesFormatted(db: serverTypes.AboutDevsDatabase, searchTerm: string): Promise<string[]> {
    if (!db) throw Error("Argument is null or undefined. Argument: db");

    const defaultResult = Promise.resolve([]);
    if (!searchTerm) return defaultResult;
    const apiResult = await searchCities(db, searchTerm);
    if (searchTerm && apiResult && apiResult.results && apiResult.results.length) {
        return apiResult.results.map((r) => formatAddress(r.place_id, r.formatted_address));
    }
    return defaultResult;
}
