"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const userHelper = require("../../src/server/services/userService");
describe("userService", () => {
    describe("extractUserNameFromEmail", () => {
        it("Basic scenario", () => {
            const userName = userHelper.extractUserNameFromEmail("andrerpena@gmail.com");
            chai_1.assert.equal(userName, "andrerpena");
        });
    });
});
//# sourceMappingURL=userHelperSpec.js.map