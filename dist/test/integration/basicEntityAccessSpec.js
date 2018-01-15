"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dbTestHelper_1 = require("./dbTestHelper");
const setupSession_1 = require("./setupSession");
describe("basicEntityAccess", () => {
    let db = null;
    setupSession_1.default(before, after, beforeEach, afterEach, ($db) => {
        db = $db;
    });
    it("can save, find and delete users", () => {
        const user = {
            name: "andrerpena",
            email: "andrerpena@gmail.com",
            display_name: "André Pena",
            photo_url: "foo.com/image.jpeg",
        };
        return dbTestHelper_1.assertCanSaveFindAndDelete(db, "user", user);
    });
});
//# sourceMappingURL=basicEntityAccessSpec.js.map