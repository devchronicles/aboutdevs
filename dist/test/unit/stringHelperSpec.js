"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const stringHelper = require("../../src/common/helpers/stringHelper");
describe("stringHelper", () => {
    describe("removeDiacritics", () => {
        it("Basic scenario", () => {
            chai_1.assert.equal(stringHelper.removeDiacritics("André"), "Andre");
            chai_1.assert.equal(stringHelper.removeDiacritics("João"), "Joao");
            chai_1.assert.equal(stringHelper.removeDiacritics("Êita meu déeus"), "Eita meu deeus");
            chai_1.assert.equal(stringHelper.removeDiacritics("ç"), "c");
        });
    });
    describe("replaceNonAlphaNumericCharactersWith", () => {
        it("Basic scenario", () => {
            chai_1.assert.equal(stringHelper.replaceNonAlphaNumericCharactersWith("///André///"), " Andr ");
            chai_1.assert.equal(stringHelper.replaceNonAlphaNumericCharactersWith("=\\çç/="), " ");
        });
    });
    describe("removeDuplicateSpaces", () => {
        it("Basic scenario", () => {
            chai_1.assert.equal(stringHelper.removeDuplicateSpaces("   Eu   sei   "), " Eu sei ");
            chai_1.assert.equal(stringHelper.removeDuplicateSpaces("Eusei"), "Eusei");
            chai_1.assert.equal(stringHelper.removeDuplicateSpaces("Eu   sei"), "Eu sei");
        });
    });
    describe("incrementLast", () => {
        it("When 0", () => {
            chai_1.assert.equal(stringHelper.incrementLast("something0"), "something1");
        });
        it("When number with one digit", () => {
            chai_1.assert.equal(stringHelper.incrementLast("something9"), "something10");
        });
        it("When big number", () => {
            chai_1.assert.equal(stringHelper.incrementLast("something9999"), "something10000");
        });
        it("When number in the number", () => {
            chai_1.assert.equal(stringHelper.incrementLast("1some2thing9999"), "1some2thing10000");
        });
        it("When no number", () => {
            chai_1.assert.equal(stringHelper.incrementLast("1some2thing"), "1some2thing");
        });
        it("When no number padding addIfNoNumber", () => {
            chai_1.assert.equal(stringHelper.incrementLast("1some2thing", true), "1some2thing1");
        });
    });
});
//# sourceMappingURL=stringHelperSpec.js.map