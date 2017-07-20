import buildDb from '../../src/server/db/buildDb';
import * as serverTypes from '../../src/server/typings';

/**
 * Truncates (delete) data from all tables
 * @param db
 */
function truncateData(db: serverTypes.TazzoDatabase) {
    if (!db) throw Error('\'db\' should be truthy');

    const entities = [
        'notification',
        'user',
        'geo_location',
        'geo_location_cache',
        'geo_location_country',
        'geo_location_state',
        'geo_location_city',
        'profession',
        'user_service',
    ];

    // concatenates all entities from the database
    const entitiesAsString = entities.map((e) => `"${e}"`).join(', ');

    // nukes the database (puff.. nothing left)
    return db.run(`truncate ${entitiesAsString} cascade`, {});
}

/**
 * Sets up a database test session
 * @param before
 * @param after
 */
export default function setupSession(
    before: (callback: (this: Mocha.IHookCallbackContext, done: MochaDone) => any) => void,
    after: (callback: (this: Mocha.IHookCallbackContext, done: MochaDone) => any) => void,
    beforeEach: (callback: (this: Mocha.IBeforeAndAfterContext, done: MochaDone) => any) => void,
    afterEach: (callback: (this: Mocha.IBeforeAndAfterContext, done: MochaDone) => any) => void,
    callback: (db: serverTypes.TazzoDatabase) => void) {

    if (!before) throw Error('\'before\' should be truthy');
    if (!after) throw Error('\'after\' should be truthy');

    let db: serverTypes.TazzoDatabase = null;

    // runs before all tests in a file
    before((done) => {
        buildDb()
            .then((m) => { db = m; callback(m); return m; })
            .then(() => done())
            .catch(done);
    });

    // runs before each test in a file
    beforeEach((done) => {
        truncateData(db)
            .then(() => done());
    });

    // runs after all tests in a file
    after((done) => {
        done();
    });
}
