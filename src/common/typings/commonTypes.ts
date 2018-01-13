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

export enum LoadState {
    NOT_INITIATED = 0,
    LOADED = 1,
    LOADING = 2,
    ERROR = 3,
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
    loadState?: LoadState;
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

export interface SocialLinkValue {
    website: string;
    url: string;
}

export interface SearchFormModel {
    searchTags: string[];
    searchFormattedAddress: string;
}

export interface DeveloperSearchProfile {
    name: string;
    displayName: string;
    photoUrl: string;
    title: string;
    companyName: string;
    formattedAddress: string;
    tags: string[];
}

export interface SearchState {
    profiles: DeveloperSearchProfile[];
    loading: boolean;
}

export interface ProfileState {
    loadState: LoadState;
    data: UserProfile;
}

export interface ReduxState {
    loggedUser?: CurrentUserProfile;
    form?: {
        profileEdit?: any;
        search?: any;
    };
    search?: SearchState;
    profile?: ProfileState;
    notifications?: ReactNotificationSystem.Notification[];
}
