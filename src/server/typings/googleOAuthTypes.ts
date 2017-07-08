
export interface GoogleOAuthProfileName {
    familyName: string;
    givenName: string;
}

export interface GoogleOAuthProfileEmail {
    value: string;
    type: string;
}

export interface GoogleOAuthProfilePhoto {
    value: string;
}

export interface GoogleOAuthProfileImage {
    url: string;
    isDefault: boolean;
}

export interface GoogleOAuthProfileJson {
    kind: string;
    etag: string;
    gender: string;
    emails: GoogleOAuthProfileEmail[];
    objectType: string;
    id: string;
    displayName: string;
    name: GoogleOAuthProfileName;
    url: string;
    image: GoogleOAuthProfileImage;
    isPlusUser: boolean;
    language: string;
    circledByCount: number;
    verified: boolean;
}

export interface GoogleOAuthProfile {
    provider: string;
    id: string;
    displayName: string;
    name: GoogleOAuthProfileName;
    emails: GoogleOAuthProfileEmail[];
    photos: GoogleOAuthProfilePhoto[];
    gender: string;
    _raw: string;
    _json: GoogleOAuthProfileJson;
}
