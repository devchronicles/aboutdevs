import { assert } from "chai";
import * as serverTypes from "../../src/server/typings";
import * as tagService from "../../src/server/services/tagService";
import setupSession from "./setupSession";

describe("locationHelperSpec", () => {
    let db: serverTypes.AboutDevsDatabase = null;
    setupSession(before, after, beforeEach, afterEach, ($db: serverTypes.AboutDevsDatabase) => {
        db = $db;
    });
    describe("searchTags", () => {
        it("checks the correct behavior", async () => {
            const searchTerm = "react";
            let tagsCache = await db.stackoverflow_tags_cache.findOne({search: searchTerm});
            assert.isNotOk(tagsCache);
            const tags = await tagService.searchTags(db, searchTerm);
            assert.isOk(tags);
            assert.equal(10, tags.items.length);
            tagsCache = await db.stackoverflow_tags_cache.findOne({search: searchTerm});
            assert.ok(tagsCache);
            assert.equal(10, tagsCache.cache.items.length);
        });
    });
});
