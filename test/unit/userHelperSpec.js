import { assert } from 'chai';
import * as userHelper from '../../src/server/helpers/userHelper';

describe('userHelper', () => {
    describe('extractUserNameFromEmail', () => {
        it('Basic scenario', () => {
            const userName = userHelper.extractUserNameFromEmail('andrerpena@gmail.com');
            assert.equal(userName, 'andrerpena');
        });
    });
});
