"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const stringHelper = require("../../src/common/helpers/stringHelper");
describe("searchHelperSpec", () => {
    describe("normalize", () => {
        it("Basic scenario", () => {
            chai_1.assert.equal(stringHelper.normalizeForSearch("André"), "andre");
            chai_1.assert.equal(stringHelper.normalizeForSearch("João"), "joao");
            chai_1.assert.equal(stringHelper.normalizeForSearch("Êita meu déeus"), "eita meu deeus");
            chai_1.assert.equal(stringHelper.normalizeForSearch("==Hey-909-"), "hey 909");
            chai_1.assert.equal(stringHelper.normalizeForSearch("Cachaça----,2 "), "cachaca 2");
            chai_1.assert.equal(stringHelper.normalizeForSearch(""), "");
            chai_1.assert.equal(stringHelper.normalizeForSearch("          "), "");
            chai_1.assert.equal(stringHelper.normalizeForSearch(null), "");
            chai_1.assert.equal(stringHelper.normalizeForSearch(undefined), "");
        });
    });
});
//# sourceMappingURL=searchHelperSpec.js.map