import { assert } from 'chai';
import * as searchHelper from '../../src/server/helpers/searchHelper';

describe('searchHelperSpec', () => {
    describe('normalize', () => {
        it('Basic scenario', () => {
            assert.equal(searchHelper.normalize('André'), 'andre');
            assert.equal(searchHelper.normalize('João'), 'joao');
            assert.equal(searchHelper.normalize('Êita meu déeus'), 'eita meu deeus');
            assert.equal(searchHelper.normalize('==Hey-909-'), 'hey 909');
            assert.equal(searchHelper.normalize('Cachaça----,2 '), 'cachaca 2');
            assert.equal(searchHelper.normalize(''), '');
            assert.equal(searchHelper.normalize(null), '');
            assert.equal(searchHelper.normalize(undefined), '');
        });
    });
});
