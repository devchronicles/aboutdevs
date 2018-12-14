// Autocomplete

export interface MatchedSubstring {
  length: number;
  offset: number;
}

export interface MainTextMatchedSubstring {
  length: number;
  offset: number;
}

export interface StructuredFormatting {
  main_text: string;
  main_text_matched_substrings: MainTextMatchedSubstring[];
  secondary_text: string;
}

export interface Term {
  offset: number;
  value: string;
}

export interface Prediction {
  description: string;
  id: string;
  matched_substrings: MatchedSubstring[];
  place_id: string;
  reference: string;
  structured_formatting: StructuredFormatting;
  terms: Term[];
  types: string[];
}

export interface GooglePlacesAutocompleteApiResult {
  predictions: Prediction[];
  status: string;
  error_message?: string;
}

// Location details

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
  viewport: Viewport;
}

export interface Result {
  formatted_address: string;
  geometry: Geometry;
  name: string;
  place_id: string;
}

export interface GooglePlacesLocationDetailsApiResult {
  html_attributions: any[];
  result: Result;
  status: string;
  error_message?: string;
}
