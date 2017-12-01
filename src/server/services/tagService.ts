import * as stringHelper from "../../common/helpers/stringHelper";
import * as serverTypes from "../typings";
import config from "../../../config/config";
import axios from "axios";

export async function getTagsFromCache(db: serverTypes.AboutDevsDatabase, searchTerm: string): Promise<serverTypes.TagSearchResult> {
    if (searchTerm === null || searchTerm === undefined) throw Error("Argument 'searchTerm' should be null or undefined");
    const result = await db.stackoverflow_tags_cache.findOne({search: searchTerm});
    return result ? result.cache : undefined;
}

export async function getTagsFromStackOverflow(searchTerm: string): Promise<serverTypes.TagSearchResult> {
    if (searchTerm === null || searchTerm === undefined) throw Error("Argument 'searchTerm' should be null or undefined");
    const encodedLocation = encodeURIComponent(searchTerm);
    const key: string = config.stackoverflow.key;

    const stackoverflowApiAddress
        = `https://api.stackexchange.com/2.2/tags?pagesize=10&order=desc&sort=popular&inname=${encodedLocation}&site=stackoverflow&key=${key}`;

    const res = await axios.get(stackoverflowApiAddress);
    if (res.data.error_message) {
        throw Error(res.data.error_message);
    }
    return res.data;
}

async function saveTagsToCache(db: serverTypes.AboutDevsDatabase, searchTerm: string, tags: serverTypes.TagSearchResult): Promise<serverTypes.TagSearchResult> {
    if (searchTerm === null || searchTerm === undefined) throw Error("Argument 'search' should be null or undefined");
    if (tags === null || tags === undefined) throw Error("Argument 'location' should be null or undefined");

    // this should be a in a transaction
    const existingCache = await getTagsFromCache(db, searchTerm);
    if (!existingCache) {
        const insertedCache = (await db.stackoverflow_tags_cache.insert({
            search: searchTerm,
            cache: tags,
        })) as serverTypes.StackoverflowTagsCache;
        return insertedCache ? insertedCache.cache : undefined;
    }
    return undefined;
}

export async function searchTags(db: serverTypes.AboutDevsDatabase, searchTerm: string): Promise<serverTypes.TagSearchResult> {
    const normalizedSearchTerm = stringHelper.normalizeForSearch(searchTerm, false);
    if (!normalizedSearchTerm) {
        return Promise.resolve<serverTypes.TagSearchResult>(undefined);
    }
    let tags = await getTagsFromCache(db, normalizedSearchTerm);
    if (tags) {
        return tags;
    }
    tags = await getTagsFromStackOverflow(normalizedSearchTerm);
    try {
        await saveTagsToCache(db, normalizedSearchTerm, tags);
    } catch (ex) {
        // TODO: Fix this.
    }
    return tags;
}

export async function searchTagsFormatted(db: serverTypes.AboutDevsDatabase, searchTerm: string): Promise<string[]> {
    const tags = await searchTags(db, searchTerm);
    if (!tags || !tags.items || !tags.items.length) return [];
    return tags.items.map((t) => t.name);
}
