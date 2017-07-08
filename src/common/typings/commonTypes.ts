export interface UserProfile {
    [key: string]: any;
    id?: number;
    type: number;
    phoneWhatsapp?: string;
    phoneAlternative?: string;
}

export interface ReduxCurrentUserProfile {
    id: number;
    name: string;
    gender: number;
    displayName: string;
    photoUrl: string;
}

export interface ReduxUserProfile {
    id: number;
    name: string;
    displayName: string;
    profession: string;
    bio: string;
    photoUrl: string;
    loadState: string;
}
