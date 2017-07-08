
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

export interface Result {
    address_components: AddressComponent[];
    formatted_address: string;
    geometry: Geometry;
    place_id: string;
    types: string[];
}

export interface GeocodeApiResult {
    results: Result[];
    status: string;
}
