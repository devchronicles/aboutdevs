import * as gravatar from "gravatar";

export enum GravatarSize {
    small = "200",
    medium = "400",
    big = "800",
}

export function getGravatarImageFromEmail(email: string, size: GravatarSize): string {
    return gravatar.url(email, {s: size, d: "retro", f: "y"});
}
