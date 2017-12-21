export interface SocialLinkData {
    value: string;
    label: string;
    iconClass?: string;
}

export const LINKED_IN_SOCIAL_KEY = "linkedin";

export const socialLinks: SocialLinkData[] = [
    {
        value: LINKED_IN_SOCIAL_KEY,
        label: "LinkedIn",
        iconClass: "fa fa-linkedin",
    },
    {
        value: "twitter",
        label: "Twitter",
        iconClass: "fa fa-twitter",
    },
    {
        value: "google-plus",
        label: "Google Plus",
        iconClass: "fa fa-google-plus",
    },
    {
        value: "facebook",
        label: "Facebook",
        iconClass: "fa fa-facebook",
    },
];
