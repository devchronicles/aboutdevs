import * as massive from "massive";
import * as serverTypes from "./index";

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
    cache: serverTypes.GeocodeApiResult;
}

export interface User {
    id: number;
    display_name: string;
    email: string;
    photo_url: string;
    oauth_profiles: {
        google?: {
            id: string,
            raw: any,
        },
        linkedin?: {
            id: string,
            raw: any,
        },
    };
    status: number;
    type: number;
    title: string;
    name: string;
    geo_location_id: number;
    bio: string;
}

export interface UserSearchResult {
    id: number;
    display_name: string;
    email: string;
    photo_url: string;
    name: string;
    bio: string;
    profession_other: string;
    profession_id: number;
    distance: number;
}

export interface Profession {
    id: number;
    name_canonical: string;
    name_feminine: string;
    name_canonical_normalized: string;
    name_feminine_normalized: string;
}

export interface StackoverflowTagsCache {
    id: number;
    search: string;
    cache: serverTypes.TagSearchResult;
}

export interface Tag {
    id: number;
    name: string;
}

export interface UserTag {
    id: number;
    user_id: number;
    tag_id: number;
}

export interface AboutDevsDatabase extends massive.Database {
    // tables
    tag: massive.Table<Tag>;
    geo_location_cache: massive.Table<GeoLocationCache>;
    geo_location: massive.Table<GeoLocation>;
    geo_location_country: massive.Table<GeoLocationCountry>;
    geo_location_state: massive.Table<GeoLocationState>;
    geo_location_city: massive.Table<GeoLocationCity>;
    user: massive.Table<User>;
    user_tag: massive.Table<UserTag>;
    stackoverflow_tags_cache: massive.Table<StackoverflowTagsCache>;

    // functions

    _aboutdevs_select_tags_from_user: (userId: number) => Promise<Tag[]>;
    is_user_name_taken: (userName: string, userId: number) => Promise<Array<{ exists: boolean }>>;
    search_professions_for_save: (profession: string) => Promise<Array<{ id: number }>>;
    search_professions: (profession: string) => Promise<Profession[]>;
    update_geometry: (geoLocationId: number, longitude: number, latitude: number) => void;
    search_users: (textNormalized: string, longitude: number, latitude: number) => Promise<UserSearchResult[]>;
    get_random_profession: () => Promise<Profession[]>;
}
