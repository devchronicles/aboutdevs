
export interface IAddressComponent {
    long_name: string;
    short_name: string;
    types: string[];
}

export interface ILocation {
    lat: number;
    lng: number;
}

export interface INortheast {
    lat: number;
    lng: number;
}

export interface ISouthwest {
    lat: number;
    lng: number;
}

export interface IViewport {
    northeast: INortheast;
    southwest: ISouthwest;
}

export interface IGeometry {
    location: Location;
    location_type: string;
    viewport: IViewport;
}

export interface IResult {
    address_components: IAddressComponent[];
    formatted_address: string;
    geometry: IGeometry;
    place_id: string;
    types: string[];
}

export interface IGeocodeApiResult {
    results: IResult[];
    status: string;
}
