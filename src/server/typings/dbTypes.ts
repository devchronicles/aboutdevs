import * as massive from 'massive';
import * as googleGeocodeTypes from './googleGeocodeTypes';

export interface GeoLocation {
    id: number;
    geo_location_city_id: number;
    formatted_address: string;
    longitude: number;
    latitude: number;
}

export interface GeoLocationCountry {
    id: number;
    long_name: string;
    short_name: string;
}

export interface GeoLocationState {
    id: number;
    long_name: string;
    short_name: string;
    geo_location_country_id: number;
}

export interface GeoLocationCity {
    id: number;
    short_name: string;
    long_name: string;
}

export interface GeoLocationCache {
    search: string;
    cache: googleGeocodeTypes.GeocodeApiResult;
}

export enum UserGender {
    MALE = 0,
    FEMALE = 1,
}

export interface User {
    id: number;
    display_name: string;
    email: string;
    photo_url: string;
    oauth_profiles: {
        google: {
            id: string,
            raw: any,
        },
    };
    status: number;
    type: number;
    profession_other: string;
    name: string;
    gender: UserGender;
    geo_location_id: number;
    profession_id: number;
    bio: string;
    activities: string;
    phone_whatsapp: string;
    phone_alternative: string;
}

export interface Profession {
    id: number;
    name_canonical: string;
    name_feminine: string;
    name_canonical_normalized: string;
    name_feminine_normalized: string;
}

export interface IndieJobsDatabase extends massive.Database {
    [key: string]: any;
    // tables
    geo_location_cache: massive.Table<GeoLocationCache>;
    geo_location: massive.Table<GeoLocation>;
    geo_location_country: massive.Table<GeoLocationCountry>;
    geo_location_state: massive.Table<GeoLocationState>;
    geo_location_city: massive.Table<GeoLocationCity>;
    user: massive.Table<User>;
    profession: massive.Table<Profession>;

    // functions
    is_user_name_taken: (userName: string, userId: number) => Promise<Array<{ exists: boolean }>>;
    search_professions_for_save: (profession: string) => Promise<Array<{ id: number }>>;
    search_professions: (profession: string) => Promise<Profession[]>;
    update_geometry: (geoLocationId: number, longitude: number, latitude: number) => void;
}
