import * as ReactNotificationSystem from "react-notification-system";

export enum Operation {
    VIEW = 0,
    EDIT = 1,
}

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

export interface UserProfile {
    id?: number; // id is not required because when you are saving a user
    name: string;
    email?: string;
    type: UserProfileType;
    loadState?: UserProfileLoadState;
    status?: UserProfileStatus;
    displayName: string;
    title: string;
    bio?: string;
    photoUrl?: string;
    tags?: UserTag[];
    address: string;
}

export interface UserSearchProfile {
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
    profiles: UserSearchProfile[];
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
