export interface AddressComponent {
    long_name: string;
    short_name: string;
    types: string[];
}

export interface Location {
    lat: number;
    lng: number;
}

export interface Northeast {
    lat: number;
    lng: number;
}

export interface Southwest {
    lat: number;
    lng: number;
}

export interface Viewport {
    northeast: Northeast;
    southwest: Southwest;
}

export interface Geometry {
    location: Location;
    location_type: string;
    viewport: Viewport;
}

export interface GooglePlacesTextSearchApiResultData {
    geometry: Geometry;
    icon: string;
    id: string;
    name: string;
    place_id: string;
    reference: string;
    types: string[];
}

export interface GooglePlacesDetailsApiResultData {
    address_components: AddressComponent[];
    adr_address: string;
    formatted_address: string;
    geometry: Geometry;
    icon: string;
    id: string;
    name: string;
    place_id: string;
    reference: string;
    scope: string;
    types: string[];
    url: string;
    utc_offset: number;
    vicinity: string;
}

/**
 * The result of a text search: https://maps.googleapis.com/maps/api/place/textsearch
 */
export interface GooglePlacesTextSearchApiResult {
    html_attributions: any[];
    results: GooglePlacesTextSearchApiResultData[];
    status: string;
}

/**
 * The result of a details search: https://maps.googleapis.com/maps/api/place/details
 */
export interface GooglePlacesDetailsApiResult {
    html_attributions: any[];
    result: GooglePlacesDetailsApiResultData;
    status: string;
}
