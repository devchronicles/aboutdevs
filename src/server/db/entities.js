// List of entities so we can promisify them and also truncate them during test
// TODO: There are ways to make this automatically and eliminate the need for this. Do it
export default [
    'notification',
    'user',
    'geo_state',
    'geo_city',
    'geo_location',
    'geo_location_cache',
    'geo_location_country',
    'geo_location_state',
    'geo_location_city',
    'profession'
];
