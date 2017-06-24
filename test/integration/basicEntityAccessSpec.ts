import { assertCanSaveFindAndDelete } from './dbTestHelper';
import setupSession from './setupSession';

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
            display_name: 'André Pena',
        };
        return assertCanSaveFindAndDelete(db, 'user', user);
    });
});
