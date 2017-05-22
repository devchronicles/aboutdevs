import { assert } from 'chai';
import { extractUserNameFromEmail } from '../../src/server/helpers/userHelper';

describe('userHelper', () => {
    describe('extractUserNameFromEmail', () => {
        it('Basic scenario', () => {
            const userName = extractUserNameFromEmail('andrerpena@gmail.com');
            assert.equal(userName, 'andrerpena');
        });
    });
});
