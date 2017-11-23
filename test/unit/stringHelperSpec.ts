import {assert} from "chai";
import * as stringHelper from "../../src/common/helpers/stringHelper";

describe("stringHelper", () => {
    describe("removeDiacritics", () => {
        it("Basic scenario", () => {
            assert.equal(stringHelper.removeDiacritics("André"), "Andre");
            assert.equal(stringHelper.removeDiacritics("João"), "Joao");
            assert.equal(stringHelper.removeDiacritics("Êita meu déeus"), "Eita meu deeus");
            assert.equal(stringHelper.removeDiacritics("ç"), "c");
        });
    });
    describe("replaceNonAlphaNumericCharactersWith", () => {
        it("Basic scenario", () => {
            assert.equal(stringHelper.replaceNonAlphaNumericCharactersWith("///André///"), " Andr ");
            assert.equal(stringHelper.replaceNonAlphaNumericCharactersWith("=\\çç/="), " ");
        });
    });
    describe("removeDuplicateSpaces", () => {
        it("Basic scenario", () => {
            assert.equal(stringHelper.removeDuplicateSpaces("   Eu   sei   "), " Eu sei ");
            assert.equal(stringHelper.removeDuplicateSpaces("Eusei"), "Eusei");
            assert.equal(stringHelper.removeDuplicateSpaces("Eu   sei"), "Eu sei");
        });
    });
    describe("incrementLast", () => {
        it("When 0", () => {
            assert.equal(stringHelper.incrementLast("something0"), "something1");
        });
        it("When number with one digit", () => {
            assert.equal(stringHelper.incrementLast("something9"), "something10");
        });
        it("When big number", () => {
            assert.equal(stringHelper.incrementLast("something9999"), "something10000");
        });
        it("When number in the number", () => {
            assert.equal(stringHelper.incrementLast("1some2thing9999"), "1some2thing10000");
        });
        it("When no number", () => {
            assert.equal(stringHelper.incrementLast("1some2thing"), "1some2thing");
        });
        it("When no number padding addIfNoNumber", () => {
            assert.equal(stringHelper.incrementLast("1some2thing", true), "1some2thing1");
        });
    });
});
