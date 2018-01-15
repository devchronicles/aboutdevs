"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function normalizeParameter(denormalizedParameter) {
    if (!denormalizedParameter)
        return denormalizedParameter;
    return encodeURIComponent(denormalizedParameter);
}
exports.normalizeParameter = normalizeParameter;
function isUrl(str) {
    const pattern = new RegExp("^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$", "i"); // fragment locator
    return pattern.test(str);
}
exports.isUrl = isUrl;
//# sourceMappingURL=urlHelper.js.map