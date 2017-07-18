import { assert } from 'chai';
import * as stringHelper from '../../src/common/helpers/stringHelper';

describe('searchHelperSpec', () => {
    describe('normalize', () => {
        it('Basic scenario', () => {
            assert.equal(stringHelper.normalize('André'), 'andre');
            assert.equal(stringHelper.normalize('João'), 'joao');
            assert.equal(stringHelper.normalize('Êita meu déeus'), 'eita meu deeus');
            assert.equal(stringHelper.normalize('==Hey-909-'), 'hey 909');
            assert.equal(stringHelper.normalize('Cachaça----,2 '), 'cachaca 2');
            assert.equal(stringHelper.normalize(''), '');
            assert.equal(stringHelper.normalize('          '), '');
            assert.equal(stringHelper.normalize(null), '');
            assert.equal(stringHelper.normalize(undefined), '');
        });
    });
});
