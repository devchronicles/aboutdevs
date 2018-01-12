import { replaceAll } from "../../common/helpers/stringHelper";

export function isValidTagName(tag: string): boolean {
    return /^[a-z0-9\+\#\-\.]{1,35}$/.test(tag);
}

export function normalizeTagName(tag: string): string {
    if (!tag) throw Error("Argument is null or undefined. Argument: tag");

    let normalizedTagName = replaceAll(tag, "+", "");
    normalizedTagName = replaceAll(normalizedTagName, "#", "");
    normalizedTagName = replaceAll(normalizedTagName, "-", "");
    normalizedTagName = replaceAll(normalizedTagName, ".", "");

    return normalizedTagName;
}

export function processTagsForSearch(tags: string[]): string {
    if (!tags || !tags.length) return "";

    return tags.map((t) => normalizeTagName(t)).join(" ");
}
