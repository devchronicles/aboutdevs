"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const stringHelper = require("../../common/helpers/stringHelper");
const config_1 = require("../../../config/config");
const axios_1 = require("axios");
function getTagsFromCache(db, searchTerm) {
    return __awaiter(this, void 0, void 0, function* () {
        if (searchTerm === null || searchTerm === undefined)
            throw Error("Argument 'searchTerm' should be null or undefined");
        const result = yield db.stackoverflow_tags_cache.findOne({ search: searchTerm });
        return result ? result.cache : undefined;
    });
}
exports.getTagsFromCache = getTagsFromCache;
function getAndSaveTagsFromStackOverflow(db, searchTerm) {
    return __awaiter(this, void 0, void 0, function* () {
        if (searchTerm === null || searchTerm === undefined)
            throw Error("Argument 'searchTerm' should be null or undefined");
        const encodedLocation = encodeURIComponent(searchTerm);
        const key = config_1.default.stackoverflow.key;
        const stackoverflowApiAddress = `https://api.stackexchange.com/2.2/tags?pagesize=10&order=desc&sort=popular&inname=${encodedLocation}&site=stackoverflow&key=${key}`;
        const res = yield axios_1.default.get(stackoverflowApiAddress);
        if (res.data.error_message) {
            throw Error(res.data.error_message);
        }
        const data = res.data;
        for (const tag of data.items) {
            yield db._aboutdevs_update_tag(tag.name, tag.count);
        }
        return data;
    });
}
exports.getAndSaveTagsFromStackOverflow = getAndSaveTagsFromStackOverflow;
function saveTagsToCache(db, searchTerm, tags) {
    return __awaiter(this, void 0, void 0, function* () {
        if (searchTerm === null || searchTerm === undefined)
            throw Error("Argument 'search' should be null or undefined");
        if (tags === null || tags === undefined)
            throw Error("Argument 'location' should be null or undefined");
        // this should be a in a transaction
        const existingCache = yield getTagsFromCache(db, searchTerm);
        if (!existingCache) {
            const insertedCache = (yield db.stackoverflow_tags_cache.insert({
                search: searchTerm,
                cache: tags,
            }));
            return insertedCache ? insertedCache.cache : undefined;
        }
        return undefined;
    });
}
function searchTags(db, searchTerm) {
    return __awaiter(this, void 0, void 0, function* () {
        const normalizedSearchTerm = stringHelper.normalizeForSearch(searchTerm, false);
        if (!normalizedSearchTerm) {
            return Promise.resolve(undefined);
        }
        let tags = yield getTagsFromCache(db, normalizedSearchTerm);
        if (tags) {
            return tags;
        }
        tags = yield getAndSaveTagsFromStackOverflow(db, normalizedSearchTerm);
        try {
            yield saveTagsToCache(db, normalizedSearchTerm, tags);
        }
        catch (ex) {
            // TODO: Fix this.
        }
        return tags;
    });
}
exports.searchTags = searchTags;
function searchTagsFormatted(db, searchTerm) {
    return __awaiter(this, void 0, void 0, function* () {
        const tags = yield searchTags(db, searchTerm);
        if (!tags || !tags.items || !tags.items.length)
            return [];
        return tags.items.map((t) => t.name);
    });
}
exports.searchTagsFormatted = searchTagsFormatted;
//# sourceMappingURL=tagService.js.map