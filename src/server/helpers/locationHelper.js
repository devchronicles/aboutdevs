import axios from 'axios';
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

    return db.geo_location_cache.saveAsync({ search: searchTerm, cache: location })
        .then(() => location);
}


/**
 * Returns the location from the cache, if it exists, or undefined, otherwise
 * @param {string} searchTerm The search term the user typed
 * @param {object} db The db object
 */
export function getLocationsFromCache(searchTerm, db) {
    if (searchTerm === null || searchTerm === undefined) throw Error('Argument \'partialAddress\' should be null or undefined');
    return new Promise((fulfill, reject) => {
        db.geo_location_cache.findOne({ search: searchTerm }, (error, locationCache) => {
            if (error) {
                reject(error);
            } else if (locationCache !== undefined) {
                fulfill(locationCache.cache);
            } else {
                fulfill(undefined);
            }
        });
    });
}

/**
 * Returns the location from Google, if it exists, or an object with an empty "results" array, otherwise
 * @param {string} searchTerm The search term the user typed
 */
export function getLocationsFromGoogle(searchTerm) {
    if (searchTerm === null || searchTerm === undefined) throw Error('Argument \'partialAddress\' should be null or undefined');
    return new Promise((fulfill, reject) => {
        const encodedLocation = encodeURIComponent(searchTerm);
        const key = config.google.geocodeApiKey;
        const googleGeoCodeApiAdress
            = `https://maps.google.com/maps/api/geocode/json?address=${encodedLocation}&components=country:BR&key=${key}`;
        axios.get(googleGeoCodeApiAdress)
            .then((res) => {
                if (res.data.errorMessage) {
                    reject(res.data.errorMessage);
                } else {
                    fulfill(res.data);
                }
            })
            .catch(reject);
    });
}

export function getLocations(searchTerm, allowCities, db) {
    return new Promise((fulfill, reject) => {
        const normalizedSearchTerm = searchHelper.normalize(searchTerm);
        if (!normalizedSearchTerm) {
            fulfill([]);
        } else {
            getLocationsFromCache(normalizedSearchTerm, db)
                .then((lc) => {
                    if (lc) return lc;
                    return getLocationsFromGoogle(normalizedSearchTerm)
                        .then(lg => saveLocationToCache(normalizedSearchTerm, lg, db))
                        .catch(reject);
                })
                .then(r => geocodeApiFormattingHelper.getFormattedAddresses(r, allowCities))
                .then(r => fulfill(r))
                .catch(reject);
        }
    });
}

export async function saveLocation(formattedText, db) {
    const locations = await getLocations(formattedText, false, db);
}
