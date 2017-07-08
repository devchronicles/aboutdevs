export interface IUserProfile {
    [key: string]: any;
    id?: number;
    type: number;
    phoneWhatsapp?: string;
    phoneAlternative?: string;
}

export interface IReduxCurrentUserProfile {
    id: number;
    name: string;
    gender: number;
    displayName: string;
    photoUrl: string;
}

export interface IReduxUserProfile {
    name: string;
    profilePicture: string;
    displayName: string;
    profession: string;
    bio: string;
    category: string;
    thumbsUp: number;
    thumbsDown: number;
}
