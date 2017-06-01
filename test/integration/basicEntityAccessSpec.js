import setupSession from './setupSession';
import { assertCanSaveFindAndDelete } from './dbTestHelper';


describe('basicEntityAccess', () => {
    let db = null;
    setupSession(before, after, beforeEach, afterEach, ($db) => {
        db = $db;
    });

    it('can save, find and delete users', () => {
        const user = {
            name: 'andrerpena',
            gender: 0,
            email: 'andrerpena@gmail.com',
            display_name: 'André Pena'
        };
        return assertCanSaveFindAndDelete(db, 'user', user);
    });
});
