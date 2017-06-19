
export interface IName {
    familyName: string;
    givenName: string;
}

export interface IEmail {
    value: string;
    type: string;
}

export interface IPhoto {
    value: string;
}

export interface IImage {
    url: string;
    isDefault: boolean;
}

export interface IJson {
    kind: string;
    etag: string;
    gender: string;
    emails: IEmail[];
    objectType: string;
    id: string;
    displayName: string;
    name: IName;
    url: string;
    image: IImage;
    isPlusUser: boolean;
    language: string;
    circledByCount: number;
    verified: boolean;
}

export interface IGoogleOAuthProfile {
    provider: string;
    id: string;
    displayName: string;
    name: IName;
    emails: IEmail[];
    photos: IPhoto[];
    gender: string;
    _raw: string;
    _json: IJson;
}
