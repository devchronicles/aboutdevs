import * as ReactNotificationSystem from 'react-notification-system';

export interface ReduxCurrentUserProfile {
    id: number;
    name: string;
    gender: number;
    displayName: string;
    photoUrl: string;
}

export enum UserProfileType {
    USER = 0,
    PROFESSIONAL = 1,
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

export interface UserService {
    id?: number;
    service: string;
    index: number;
}

export interface UserProfile {
    [key: string]: any;

    id?: number; // id is not required because when you are saving a user
    name: string;
    type: UserProfileType;
    loadState?: UserProfileLoadState;
    status?: UserProfileStatus;
    displayName: string;
    profession: string;
    bio?: string;
    photoUrl?: string;
    services?: UserService[];
    phoneWhatsapp?: string;
    phoneAlternative?: string;
    address: string;
}

export interface UserSearchProfile {
    id: number;
    displayName: string;
    photoUrl: string;
    name: string;
    bio: string;
    distance: number;
    profession: string;
    services: UserService[];
}

export interface UserService {
    id?: number;
    service: string;
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
    loggedUser: ReduxCurrentUserProfile;
    form: {
        profileEdit?: any,
    };
    search: SearchState;
    notifications: ReactNotificationSystem.Notification[];
}
