import { assert } from 'chai';
import * as geocodeApiHelper from '../../../src/server/helpers/geocodeApiHelper';
import * as geocodeApiFormattingHelper from '../../../src/server/helpers/geocodeApiFormattingHelper';
import setupSession from '../db/setupSession';

describe('geocodeApiHelperSpec', () => {
    describe('getAddressesFromGoogle', () => {
        it('Should work with propertly formatted address',
            () => geocodeApiHelper.getAddressesFromGoogle('Rua Henrique Surerus, 28, Juiz de Fora, MG')
                .then(r => geocodeApiFormattingHelper.getFormattedAddresses(r))
                .then((res) => {
                    assert.equal(res.length, 1);
                    assert.equal(res[0], 'Rua Henrique Surerus, 28, Centro, Juiz de Fora, MG');
                }));
        it('Should work with propertly poorly formatted address',
            () => geocodeApiHelper.getAddressesFromGoogle(' r Henrique Surerus, 28  Juiz de Fora, /')
                .then(r => geocodeApiFormattingHelper.getFormattedAddresses(r))
                .then((res) => {
                    assert.equal(res.length, 1);
                    assert.equal(res[0], 'Rua Henrique Surerus, 28, Centro, Juiz de Fora, MG');
                }));
        it('Should work with propertly poorly formatted address 2',
            () => geocodeApiHelper.getAddressesFromGoogle('Henrique Surerus JF')
                .then(r => geocodeApiFormattingHelper.getFormattedAddresses(r))
                .then((res) => {
                    assert.equal(res.length, 1);
                    assert.equal(res[0], 'Rua Henrique Surerus, Centro, Juiz de Fora, MG');
                }));
        it('Should work with landmarks',
            () => geocodeApiHelper.getAddressesFromGoogle('Shopping Alameda JF')
                .then(r => geocodeApiFormattingHelper.getFormattedAddresses(r))
                .then((res) => {
                    assert.equal(res.length, 1);
                    assert.equal(res[0], 'Rua Morais e Castro, 300, Passos, Juiz de Fora, MG');
                }));

        it('Should not work with city only',
            () => geocodeApiHelper.getAddressesFromGoogle('Juiz de Fora MG')
                .then(r => geocodeApiFormattingHelper.getFormattedAddresses(r))
                .then((res) => {
                    assert.equal(res.length, 0);
                }));

        it('Should work when the address is not valid',
            () => geocodeApiHelper.getAddressesFromGoogle('This is not a valid city')
                .then(r => geocodeApiFormattingHelper.getFormattedAddresses(r))
                .then((res) => {
                    assert.equal(res.length, 0);
                }));
    });
    describe('getAddresses', () => {
        let db = null;
        setupSession(before, after, beforeEach, afterEach, ($db) => {
            db = $db;
        });

        it('checks the correct behavior', () => {
            const searchTerm = 'henrique surerus jf';
            return db.location_cache.findOneAsync({ search: searchTerm })
                .then((r) => {
                    assert.isNotOk(r);
                })
                .then(() => geocodeApiHelper.getAddresses(searchTerm, db))
                .then((l) => {
                    assert.equal(1, l.length);
                })
                .then(() => db.location_cache.findOneAsync({ search: searchTerm }))
                .then((r) => {
                    assert.ok(r);
                });
        });
    });
});

