import * as serverTypes from "../../src/server/typings";
import {assertCanSaveFindAndDelete} from "./dbTestHelper";
import setupSession from "./setupSession";

describe("basicEntityAccess", () => {
    let db: serverTypes.AboutDevsDatabase = null;
    setupSession(before, after, beforeEach, afterEach, ($db: serverTypes.AboutDevsDatabase) => {
        db = $db;
    });

    it("can save, find and delete users", () => {
        const user = {
            name: "andrerpena",
            gender: 0,
            email: "andrerpena@gmail.com",
            display_name: "André Pena",
            photo_url: "foo.com/image.jpeg",
        };
        return assertCanSaveFindAndDelete(db, "user", user);
    });
});
