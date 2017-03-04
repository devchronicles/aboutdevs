import setupSession from './setupSession';
import { assertCanSaveFindAndDelete } from './dbTestHelper';


describe('basicEntitiAccess', () => {
    let db = null;
    setupSession(before, after, beforeEach, afterEach, ($db) => {
        db = $db;
    });

    it('can save, find and delete users', (done) => {
        const user = {
            email: 'andrerpena@gmail.com',
            display_name: 'André Pena'
        };
        assertCanSaveFindAndDelete(db, 'user', user)
            .then(() => done())
            .catch(done);
    });
});
