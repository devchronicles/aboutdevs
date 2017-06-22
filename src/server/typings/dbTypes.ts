import * as massive from 'massive';
import * as googleGeocodeTypes from './googleGeocodeTypes';

export interface IGeoLocation {
    id: number;
    geo_location_city_id: number;
    formatted_address: string;
}

export interface IGeoLocationCountry {
    id: number;
    long_name: string;
    short_name: string;
}

export interface IGeoLocationState {
    id: number;
    long_name: string;
    short_name: string;
    geo_location_country_id: number;
}

export interface IGeoLocationCity {
    id: number;
    short_name: string;
    long_name: string;
}

export interface IGeoLocationCache {
    search: string;
    cache: googleGeocodeTypes.IGeocodeApiResult;
}

export interface IUser {
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
    gender: number;
    geo_location_id: number;
    profession_id: number;
    bio: string;
    activities: string;
    phone_whatsapp: string;
    phone_alternative: string;
}

export interface IProfession {
    id: number;
    name_canonical: string;
    name_feminine: string;
}

export interface IIndieJobsDatabase extends massive.Database {
    // tables
    geo_location_cache: massive.Table<IGeoLocationCache>;
    geo_location: massive.Table<IGeoLocation>;
    geo_location_country: massive.Table<IGeoLocationCountry>;
    geo_location_state: massive.Table<IGeoLocationState>;
    geo_location_city: massive.Table<IGeoLocationCity>;
    user: massive.Table<IUser>;

    // functions
    is_user_name_taken: (userName: string, userId: number) => Promise<boolean[]>;
    search_professions_for_save: (profession: string) => Promise<number[]>;
    search_professions: (profession: string) => Promise<IProfession[]>;
}
