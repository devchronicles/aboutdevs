// To parse this data:
//
//   import { Convert, Welcome } from "./file";
//
//   const welcome = Convert.toWelcome(json);

export interface LinkedInOAuthProfile {
    apiStandardProfileRequest: LinkedInApiStandardProfileRequest;
    currentShare: LinkedInCurrentShare;
    distance: number;
    emailAddress: string;
    firstName: string;
    formattedName: string;
    headline: string;
    id: string;
    industry: string;
    lastName: string;
    location: LinkedInLocation;
    numConnections: number;
    numConnectionsCapped: boolean;
    pictureUrl: string;
    pictureUrls: LinkedInPictureUrls;
    positions: LinkedInPositions;
    publicProfileUrl: string;
    relationToViewer: LinkedInRelationToViewer;
    siteStandardProfileRequest: LinkedInSiteStandardProfileRequest;
}

export interface LinkedInSiteStandardProfileRequest {
    url: string;
}

export interface LinkedInRelationToViewer {
    distance: number;
}

export interface LinkedInPositions {
    _total: number;
    values: LinkedInPositionValues[];
}

export interface LinkedInPositionValues {
    company: LinkedInPositionCompany;
    id: number;
    isCurrent: boolean;
    location: LinkedInPositionLocation;
    startDate: LinkedInPositionStartDate;
    summary: string;
    title: string;
}

export interface LinkedInPositionStartDate {
    month: number;
    year: number;
}

export interface LinkedInPositionLocation {
    country: LinkedInPositionLocationCountry;
    name: string;
}

export interface LinkedInPositionLocationCountry {
    code: string;
    name: string;
}

export interface LinkedInPositionCompany {
    id: number;
    industry: string;
    name: string;
    size: string;
    type: string;
}

export interface LinkedInPictureUrls {
    _total: number;
    values: string[];
}

export interface LinkedInLocation {
    country: LinkedInVisibility;
    name: string;
}

export interface LinkedInCurrentShare {
    author: LinkedInCurrentShareAuthor;
    comment: string;
    id: string;
    source: LinkedInCurrentShareSource;
    timestamp: number;
    visibility: LinkedInVisibility;
}

export interface LinkedInVisibility {
    code: string;
}

export interface LinkedInCurrentShareSource {
    serviceProvider: LinkedInCurrentShareServiceProvider;
}

export interface LinkedInCurrentShareServiceProvider {
    name: string;
}

export interface LinkedInCurrentShareAuthor {
    firstName: string;
    id: string;
    lastName: string;
}

export interface LinkedInApiStandardProfileRequest {
    headers: LinkedInApiStatusProfileRequestHeaders;
    url: string;
}

export interface LinkedInApiStatusProfileRequestHeaders {
    _total: number;
    values: LinkedInApiStatusProfileRequestHeaderValues[];
}

export interface LinkedInApiStatusProfileRequestHeaderValues {
    name: string;
    value: string;
}