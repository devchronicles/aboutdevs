"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const googlePlacesFormatHelper_1 = require("../../common/helpers/googlePlacesFormatHelper");
const tagHelper_1 = require("./tagHelper");
const urlHelper_1 = require("../../common/helpers/urlHelper");
function getDeveloperSearchUrl(tags, formattedAddress) {
    const { placeId, address } = googlePlacesFormatHelper_1.getDataFromFormattedAddress(formattedAddress);
    const tagParameter = tagHelper_1.createTagsParameter(tags);
    return `/s/t/${urlHelper_1.normalizeParameter(tagParameter)}/l/${urlHelper_1.normalizeParameter(placeId)}/${urlHelper_1.normalizeParameter(address)}`;
}
exports.getDeveloperSearchUrl = getDeveloperSearchUrl;
//# sourceMappingURL=routeHelper.js.map