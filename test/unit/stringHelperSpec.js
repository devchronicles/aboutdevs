import { assert } from 'chai';
import * as stringHelper from '../../src/common/helpers/stringHelper';

describe('stringHelper', () => {
    describe('removeDiacritics', () => {
        it('Basic scenario', () => {
            assert.equal(stringHelper.removeDiacritics('André'), 'Andre');
            assert.equal(stringHelper.removeDiacritics('João'), 'Joao');
            assert.equal(stringHelper.removeDiacritics('Êita meu déeus'), 'Eita meu deeus');
            assert.equal(stringHelper.removeDiacritics('ç'), 'c');
        });
    });
    describe('replaceNonAlphaNumericCharactersWithSpaces', () => {
        it('Basic scenario', () => {
            assert.equal(stringHelper.replaceNonAlphaNumericCharactersWithSpaces('///André///'), ' Andr ');
            assert.equal(stringHelper.replaceNonAlphaNumericCharactersWithSpaces('=\\çç/='), ' ');
        });
    });
    describe('normalizeSpaces', () => {
        it('Basic scenario', () => {
            assert.equal(stringHelper.normalizeSpaces('   Eu   sei   '), ' Eu sei ');
            assert.equal(stringHelper.normalizeSpaces('Eusei'), 'Eusei');
            assert.equal(stringHelper.normalizeSpaces('Eu   sei'), 'Eu sei');
        });
    });
});
