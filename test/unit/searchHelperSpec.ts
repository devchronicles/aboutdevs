import {assert} from "chai";
import * as stringHelper from "../../src/common/helpers/stringHelper";

describe("searchHelperSpec", () => {
    describe("normalize", () => {
        it("Basic scenario", () => {
            assert.equal(stringHelper.normalizeForSearch("André"), "andre");
            assert.equal(stringHelper.normalizeForSearch("João"), "joao");
            assert.equal(stringHelper.normalizeForSearch("Êita meu déeus"), "eita meu deeus");
            assert.equal(stringHelper.normalizeForSearch("==Hey-909-"), "hey 909");
            assert.equal(stringHelper.normalizeForSearch("Cachaça----,2 "), "cachaca 2");
            assert.equal(stringHelper.normalizeForSearch(""), "");
            assert.equal(stringHelper.normalizeForSearch("          "), "");
            assert.equal(stringHelper.normalizeForSearch(null), "");
            assert.equal(stringHelper.normalizeForSearch(undefined), "");
        });
    });
});
