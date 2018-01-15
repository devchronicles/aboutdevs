"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stringHelper_1 = require("../../common/helpers/stringHelper");
function isValidTagName(tag) {
    return /^[a-z0-9\+\#\-\.]{1,35}$/.test(tag);
}
exports.isValidTagName = isValidTagName;
function normalizeTagName(tag) {
    if (!tag)
        throw Error("Argument is null or undefined. Argument: tag");
    let normalizedTagName = stringHelper_1.replaceAll(tag, "+", "");
    normalizedTagName = stringHelper_1.replaceAll(normalizedTagName, "#", "");
    normalizedTagName = stringHelper_1.replaceAll(normalizedTagName, "-", "");
    normalizedTagName = stringHelper_1.replaceAll(normalizedTagName, ".", "");
    return normalizedTagName;
}
exports.normalizeTagName = normalizeTagName;
function normalizeAllTags(tags) {
    if (!tags || !tags.length)
        return "";
    return tags.map((t) => normalizeTagName(t)).join(" ");
}
exports.normalizeAllTags = normalizeAllTags;
/**
 * Expects something like asp.net&c# and should return something line "aspnet & c"
 * @param {string} tags
 * @returns {string}
 */
function processTagsForSearch(tags) {
    if (!tags)
        return tags;
    return tags.split("&").map(normalizeTagName).join(" & ");
}
exports.processTagsForSearch = processTagsForSearch;
function createTagsParameter(tags) {
    return tags ? tags.join("&") : "";
}
exports.createTagsParameter = createTagsParameter;
function distillTagsParameter(tagsParameter) {
    if (!tagsParameter)
        return [];
    return tagsParameter.split("&").map((t) => t.trim());
}
exports.distillTagsParameter = distillTagsParameter;
//# sourceMappingURL=tagHelper.js.map