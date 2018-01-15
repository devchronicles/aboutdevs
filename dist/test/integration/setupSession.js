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
const buildDb_1 = require("../../src/server/db/buildDb");
/**
 * Truncates (delete) data from all tables
 * @param db
 */
function truncateData(db) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!db)
            throw Error("'db' should be truthy");
        // nukes the database (puff.. nothing left)
        yield db._aboutdevs_cleanup_db();
    });
}
/**
 * Sets up a database test session
 * @param before
 * @param after
 */
function setupSession(before, after, beforeEach, afterEach, callback) {
    if (!before)
        throw Error("'before' should be truthy");
    if (!after)
        throw Error("'after' should be truthy");
    let db = null;
    // runs before all tests in a file
    before((done) => {
        buildDb_1.default()
            .then((m) => {
            db = m;
            callback(m);
            return m;
        })
            .then(() => done())
            .catch(done);
    });
    // runs before each test in a file
    beforeEach(() => __awaiter(this, void 0, void 0, function* () {
        yield truncateData(db);
    }));
    // runs after all tests in a file
    after((done) => {
        done();
    });
}
exports.default = setupSession;
//# sourceMappingURL=setupSession.js.map