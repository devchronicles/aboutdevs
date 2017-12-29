import * as ReactNotificationSystem from "react-notification-system";

export interface CurrentUserProfile {
    id: number;
    name: string;
    displayName: string;
    photoUrl: string;
}

export enum UserProfileType {
    DEVELOPER = 0,
    RECRUITER = 1,
}

export enum UserProfileLoadState {
    LOADED = 0,
    LOADING = 1,
    ERROR = 2,
}

export enum UserProfileStatus {
    PENDING_PROFILE_ACTIVATION = 0,
    READY = 1,
}

export interface UserProfileColors {
    headerBackground: string;
    headerText: string;
    bodyBackground: string;
    bodyText: string;
}

export interface UserProfileInfoGroupItem {
    title: string;
    url: string;
    description: string;
    tags: string[];
}

export interface UserProfileInfoGroup {
    title: string;
    items: UserProfileInfoGroupItem[];
}

export interface UserProfileBio {
    text: string;
}

export interface UserProfile {
    [key: string]: any;

    id?: number; // id is not required because when you are saving a user
    name: string;
    email?: string;
    type: UserProfileType;
    loadState?: UserProfileLoadState;
    status?: UserProfileStatus;
    displayName: string;
    title: string;
    bio?: UserProfileBio;
    socialLinks?: SocialLinkValue[];
    infoGroups?: UserProfileInfoGroup[];
    photoUrl?: string;
    tags?: string[];
    formattedAddress: string;
    colors?: UserProfileColors;
    companyName?: string;
    companyUrl?: string;
}

export interface DeveloperSearchProfile {
    id: number;
    displayName: string;
    photoUrl: string;
    name: string;
    distance: number;
    title: string;
    tags: UserTag[];
}

export interface UserTag {
    id?: number;
    name: string;
}

export interface SocialLinkValue {
    website: string;
    url: string;
}

// SEARCH

export enum SearchDisplay {
    ORDER_BY_DISTANCE = 0,
    BEST_PROFESSIONAIS_IN_2_KM = 1,
    BEST_PROFESSIONAIS_IN_5_KM = 2,
    BEST_PROFESSIONAIS_IN_10_KM = 3,
}

export interface SearchCriteria {
    search: string;
    location: string;
    loading: boolean;
}

export interface SearchResult {
    display: SearchDisplay;
    profiles: DeveloperSearchProfile[];
    loading: boolean;
}

export interface SearchState {
    result: SearchResult;
    criteria: SearchCriteria;
}

export interface ReduxState {
    loggedUser: CurrentUserProfile;
    form: {
        profileEdit?: any,
    };
    search: SearchState;
    notifications: ReactNotificationSystem.Notification[];
}
