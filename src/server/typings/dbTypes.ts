import * as massive from "massive";
import * as commonTypes from "../../common/typings/commonTypes";
import * as serverTypes from "./index";
import { SocialLinkValue } from "../../common/typings";

export interface GooglePlace {
    id: number;
    formatted_address: string;
    longitude: number;
    latitude: number;
    google_place_id: string;
    google_place_details: serverTypes.GooglePlacesDetailsApiResult;
}

export interface GooglePlacesTextSearchCache {
    id: number;
    search: string;
    cache: serverTypes.GooglePlacesTextSearchApiResult;
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
    status: commonTypes.UserProfileStatus;
    type: commonTypes.UserProfileType;
    social_links: {
        socialLinks: SocialLinkValue[];
    };
    title: string;
    name: string;
    google_place_id: number;
    google_place_formatted_address: string;
    bio: string;
    color_primary?: string;
    color_secondary?: string;
    color_negative?: string;
    company_name?: string;
    company_url?: string;
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
    _aboutdevs_update_tag: (name: string, relevance: number) => Promise<void>;

    // tables
    tag: massive.Table<Tag>;
    google_places_textsearch_cache: massive.Table<GooglePlacesTextSearchCache>;
    google_place: massive.Table<GooglePlace>;
    user: massive.Table<User>;
    user_tag: massive.Table<UserTag>;
    stackoverflow_tags_cache: massive.Table<StackoverflowTagsCache>;

    // functions
    _aboutdevs_select_tags_from_user: (userId: number) => Promise<Tag[]>;

    [key: string]: any;

    _aboutdevs_cleanup_db: () => void;
    _aboutdevs_is_user_name_taken: (userName: string, userId: number) => Promise<Array<{ exists: boolean }>>;
    _aboutdevs_update_geometry: (geoLocationId: number, longitude: number, latitude: number) => void;
    _aboutdevs_search_developers: (tags: string[], longitude: number, latitude: number) => Promise<UserSearchResult[]>;
}
