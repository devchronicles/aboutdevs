import { getDataFromFormattedAddress } from "../../common/helpers/locationFormatHelper";
import { createTagsParameter } from "./tagHelper";
import { normalizeParameter } from "../../common/helpers/urlHelper";

export function getDeveloperSearchUrl(tags: string[], formattedAddress: string): string {
    if (!tags) throw Error("Argument is null or undefined. Argument: tags");
    const tagParameter = createTagsParameter(tags);
    if (formattedAddress) {
        const {placeId, address} = getDataFromFormattedAddress(formattedAddress);
        return `/s/t/${normalizeParameter(tagParameter)}/l/${normalizeParameter(placeId)}/${normalizeParameter(address)}`;
    }
    return `/s/t/${normalizeParameter(tagParameter)}`;
}

export function getHomeUrl() {
    return `/`;
}

export function getEditMyProfileUrl() {
    return `/c/edituserprofile`;
}

export function getUserProfileUrl(userName: string) {
    return `/${userName}`;
}

export function getLogoutUrl() {
    return `/a/logout`;
}

export function getLoginUrl() {
    return `/a/linkedin`;
}

export function getNotFoundUrl() {
    return `/404`;
}