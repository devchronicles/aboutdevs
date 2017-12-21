export interface SocialLinkData {
    value: string;
    label: string;
    iconClass?: string;
}

export const socialLinks: SocialLinkData[] = [
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
