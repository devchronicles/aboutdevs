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
const chai_1 = require("chai");
const tagService = require("../../src/server/services/tagService");
const setupSession_1 = require("./setupSession");
describe("tagHelperSpec", () => {
    let db = null;
    setupSession_1.default(before, after, beforeEach, afterEach, ($db) => {
        db = $db;
    });
    describe("searchTags", () => {
        it("checks the correct behavior", () => __awaiter(this, void 0, void 0, function* () {
            const searchTerm = "react";
            let tagsCache = yield db.stackoverflow_tags_cache.findOne({ search: searchTerm });
            chai_1.assert.isNotOk(tagsCache);
            const tags = yield tagService.searchTags(db, searchTerm);
            chai_1.assert.isOk(tags);
            chai_1.assert.equal(10, tags.items.length);
            tagsCache = yield db.stackoverflow_tags_cache.findOne({ search: searchTerm });
            chai_1.assert.ok(tagsCache);
            chai_1.assert.equal(10, tagsCache.cache.items.length);
        }));
    });
});
//# sourceMappingURL=tagServiceSpec.js.map