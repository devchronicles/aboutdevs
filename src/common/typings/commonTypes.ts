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

export interface UserService {
    id?: number;
    service: string;
}

export interface ReduxState {
    loggedUser: ReduxCurrentUserProfile;
    form: {
        profileEdit?: any,
    };
    notifications: ReactNotificationSystem.Notification[];
}
