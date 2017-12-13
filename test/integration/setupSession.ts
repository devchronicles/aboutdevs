import buildDb from "../../src/server/db/buildDb";
import * as serverTypes from "../../src/server/typings";

/**
 * Truncates (delete) data from all tables
 * @param db
 */
async function truncateData(db: serverTypes.AboutDevsDatabase) {
    if (!db) throw Error("'db' should be truthy");
    // nukes the database (puff.. nothing left)
    await db._aboutdevs_cleanup_db();
}

/**
 * Sets up a database test session
 * @param before
 * @param after
 */
export default function setupSession(before: (callback: (this: Mocha.IHookCallbackContext, done: MochaDone) => any) => void,
                                     after: (callback: (this: Mocha.IHookCallbackContext, done: MochaDone) => any) => void,
                                     beforeEach: (callback: (this: Mocha.IBeforeAndAfterContext, done: MochaDone) => any) => void,
                                     afterEach: (callback: (this: Mocha.IBeforeAndAfterContext, done: MochaDone) => any) => void,
                                     callback: (db: serverTypes.AboutDevsDatabase) => void) {

    if (!before) throw Error("'before' should be truthy");
    if (!after) throw Error("'after' should be truthy");

    let db: serverTypes.AboutDevsDatabase = null;

    // runs before all tests in a file
    before((done) => {
        buildDb()
            .then((m) => {
                db = m;
                callback(m);
                return m;
            })
            .then(() => done())
            .catch(done);
    });

    // runs before each test in a file
    beforeEach(async () => {
        await truncateData(db);
    });

    // runs after all tests in a file
    after((done) => {
        done();
    });
}
