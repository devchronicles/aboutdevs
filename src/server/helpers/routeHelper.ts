import { getDataFromFormattedAddress } from "../../common/helpers/googlePlacesFormatHelper";
import { createTagsParameter } from "./tagHelper";
import { normalizeParameter } from "../../common/helpers/urlHelper";

export function getDeveloperSearchUrl(tags: string[], formattedAddress: string): string {
    const {placeId, address} = getDataFromFormattedAddress(formattedAddress);
    const tagParameter = createTagsParameter(tags);
    return `/s/t/${normalizeParameter(tagParameter)}/l/${normalizeParameter(placeId)}/${normalizeParameter(address)}`;
}
