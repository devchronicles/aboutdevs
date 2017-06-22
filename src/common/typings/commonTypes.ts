export interface IUserProfile {
    [key: string]: any;
    type: number;
    id: number;
    phoneWhatsapp: string;
    phoneAlternative: string;
}

export interface IReduxCurrentUserProfile {
    id: number;
    name: string;
    gender: number;
    displayName: string;
    photoUrl: string;
}
