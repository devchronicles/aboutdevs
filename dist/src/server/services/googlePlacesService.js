"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const config_1 = require("../../../config/config");
const geocodeApiHelper = require("../helpers/geocodeApiHelper");
const stringHelper = require("../../common/helpers/stringHelper");
const googlePlacesFormatHelper_1 = require("../../common/helpers/googlePlacesFormatHelper");
/**
 * Saves the given {search, location} to the cache and returns the location if everything goes fine
 * @param {string} searchTerm The search term the user typed
 * @param {object} citySearchCache The location to be saved in the cache
 * @param {object} db The db object
 */
function saveCitySearchToCache(db, searchTerm, citySearchCache) {
    return __awaiter(this, void 0, void 0, function* () {
        if (searchTerm === null || searchTerm === undefined)
            throw Error("Argument 'search' should be null or undefined");
        if (citySearchCache === null || citySearchCache === undefined)
            throw Error("Argument 'location' should be null or undefined");
        // this should be a in a transaction
        const cities = yield searchCitiesFromCache(db, searchTerm);
        if (!cities) {
            yield db.google_places_textsearch_cache.insert({
                search: searchTerm,
                cache: citySearchCache,
            });
        }
    });
}
function saveCityDetailsToCache(db, placeId, cityDetails) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!db)
            throw Error("Argument is null or undefined. Argument: db");
        if (!placeId)
            throw Error("Argument is null or undefined. Argument: placeId");
        if (!cityDetails)
            throw Error("Argument is null or undefined. Argument: cityDetails");
        if (!cityDetails.result)
            throw Error("Argument is null or undefined. Argument: cityDetails.result");
        let googlePlace = yield db.google_place.findOne({ google_place_id: placeId });
        if (!googlePlace) {
            const cityData = cityDetails.result;
            const { longitude, latitude } = geocodeApiHelper.getLongitudeLatitude(cityData.geometry);
            googlePlace = yield db.google_place.insert({
                formatted_address: googlePlacesFormatHelper_1.formatAddress(placeId, cityData.formatted_address),
                longitude,
                latitude,
                google_place_id: placeId,
                google_place_details: cityData,
            });
            yield db._aboutdevs_place_update_geometry(googlePlace.id, longitude, latitude);
        }
        return googlePlace;
    });
}
function searchCitiesFromCache(db, searchTerm) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!db)
            throw Error("Argument is null or undefined. Argument: db");
        if (!searchTerm)
            throw Error("Argument is null or undefined. Argument: searchTerm");
        const result = yield db.google_places_textsearch_cache.findOne({ search: searchTerm });
        return result ? result.cache : undefined;
    });
}
exports.searchCitiesFromCache = searchCitiesFromCache;
function searchCitiesFromGoogle(searchTerm) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!searchTerm)
            throw Error("Argument is null or undefined. Argument: searchTerm");
        const encodedLocation = encodeURIComponent(searchTerm);
        const key = config_1.default.google.geocodeApiKey;
        const googleApiUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodedLocation}&key=${key}&type=regions`;
        const res = yield axios_1.default.get(googleApiUrl);
        if (res.data.errorMessage) {
            throw Error(res.data.errorMessage);
        }
        return res.data;
    });
}
exports.searchCitiesFromGoogle = searchCitiesFromGoogle;
function getCityDetailsFromGoogle(placeId) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!placeId)
            throw Error("Argument is null or undefined. Argument: searchTerm");
        const key = config_1.default.google.geocodeApiKey;
        const googleApiUrl = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${key}`;
        const res = yield axios_1.default.get(googleApiUrl);
        if (res.data.errorMessage) {
            throw Error(res.data.errorMessage);
        }
        return res.data;
    });
}
exports.getCityDetailsFromGoogle = getCityDetailsFromGoogle;
function getAndSaveCity(db, formattedAddress) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!db)
            throw Error("Argument is null or undefined. Argument: db");
        if (!formattedAddress)
            throw Error("Argument is null or undefined. Argument: formattedAddress");
        if (!googlePlacesFormatHelper_1.validateFormattedAddress(formattedAddress))
            throw Error(`Address is not formatted. Address: ${formattedAddress}`);
        const { placeId } = googlePlacesFormatHelper_1.getDataFromFormattedAddress(formattedAddress);
        let googlePlace = yield db.google_place.findOne({ google_place_id: placeId });
        if (!googlePlace) {
            const cityDetails = yield getCityDetailsFromGoogle(placeId);
            googlePlace = yield saveCityDetailsToCache(db, placeId, cityDetails);
        }
        return googlePlace;
    });
}
exports.getAndSaveCity = getAndSaveCity;
function searchCities(db, searchTerm) {
    return __awaiter(this, void 0, void 0, function* () {
        const normalizedSearchTerm = stringHelper.normalizeForSearch(searchTerm);
        if (!normalizedSearchTerm) {
            return Promise.resolve(undefined);
        }
        let cities = yield searchCitiesFromCache(db, normalizedSearchTerm);
        if (cities) {
            return cities;
        }
        cities = yield searchCitiesFromGoogle(normalizedSearchTerm);
        yield saveCitySearchToCache(db, normalizedSearchTerm, cities);
        return cities;
    });
}
exports.searchCities = searchCities;
function searchCitiesFormatted(db, searchTerm) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!db)
            throw Error("Argument is null or undefined. Argument: db");
        const defaultResult = Promise.resolve([]);
        if (!searchTerm)
            return defaultResult;
        const apiResult = yield searchCities(db, searchTerm);
        if (searchTerm && apiResult && apiResult.results && apiResult.results.length) {
            return apiResult.results.map((r) => googlePlacesFormatHelper_1.formatAddress(r.place_id, r.formatted_address));
        }
        return defaultResult;
    });
}
exports.searchCitiesFormatted = searchCitiesFormatted;
//# sourceMappingURL=googlePlacesService.js.map