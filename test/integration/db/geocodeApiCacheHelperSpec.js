import { assert } from 'chai';
import setupSession from './setupSession';
import * as geocodeApiCacheHelper from '../../../src/server/helpers/geocodeApiCacheHelper';


describe('geocodeApiCacheHelper', () => {
    let db = null;
    setupSession(before, after, beforeEach, afterEach, ($db) => {
        db = $db;
    });

    it('checks the correct behavior', (done) => {
        const searchTerm = 'henrique surerus jf';
        db.location_cache.findOneAsync({ search: searchTerm })
            .then((r) => {
                assert.isNotOk(r);
            })
            .then(() => geocodeApiCacheHelper.getAddresses(searchTerm, db))
            .then((l) => {
                assert.equal(1, l.results.length);
                done();
            })
            .then(() => db.location_cache.findOneAsync({ search: searchTerm }))
            .then((r) => {
                assert.ok(r);
            })
            .catch(done);
    });
});
