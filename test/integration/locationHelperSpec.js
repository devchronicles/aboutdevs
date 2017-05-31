import { assert } from 'chai';
import * as locationHelper from '../../src/server/helpers/locationHelper';
import * as geocodeApiFormattingHelper from '../../src/server/helpers/geocodeApiFormattingHelper';
import setupSession from './setupSession';
import sampleLocation from './resources/googleGeocodeApiResultSample';

describe('locationHelperSpec', () => {
    let db = null;
    setupSession(before, after, beforeEach, afterEach, ($db) => {
        db = $db;
    });
    describe('getLocationsFromGoogle', () => {
        it('Should work with propertly formatted address',
            () => locationHelper.getLocationsFromGoogle('Rua Henrique Surerus, 28, Juiz de Fora, MG')
                .then(r => geocodeApiFormattingHelper.getFormattedLocations(r))
                .then((res) => {
                    assert.equal(res.length, 1);
                    assert.equal(res[0], 'Rua Henrique Surerus, 28, Centro, Juiz de Fora, MG');
                }));
        it('Should work with propertly poorly formatted address',
            () => locationHelper.getLocationsFromGoogle(' r Henrique Surerus, 28  Juiz de Fora, /')
                .then(r => geocodeApiFormattingHelper.getFormattedLocations(r))
                .then((res) => {
                    assert.equal(res.length, 1);
                    assert.equal(res[0], 'Rua Henrique Surerus, 28, Centro, Juiz de Fora, MG');
                }));
        it('Should work with propertly poorly formatted address 2',
            () => locationHelper.getLocationsFromGoogle('Henrique Surerus JF')
                .then(r => geocodeApiFormattingHelper.getFormattedLocations(r))
                .then((res) => {
                    assert.equal(res.length, 1);
                    assert.equal(res[0], 'Rua Henrique Surerus, Centro, Juiz de Fora, MG');
                }));
        it('Should work with landmarks',
            () => locationHelper.getLocationsFromGoogle('Shopping Alameda JF')
                .then(r => geocodeApiFormattingHelper.getFormattedLocations(r))
                .then((res) => {
                    assert.equal(res.length, 1);
                    assert.equal(res[0], 'Rua Morais e Castro, 300, Passos, Juiz de Fora, MG');
                }));

        it('Should not work with city only by default',
            () => locationHelper.getLocationsFromGoogle('Juiz de Fora MG')
                .then(r => geocodeApiFormattingHelper.getFormattedLocations(r))
                .then((res) => {
                    assert.equal(res.length, 0);
                }));

        it('Should work with city only when specified',
            () => locationHelper.getLocationsFromGoogle('Juiz de Fora MG')
                .then(r => geocodeApiFormattingHelper.getFormattedLocations(r, true))
                .then((res) => {
                    assert.equal(res.length, 1);
                }));

        it('Should work when the address is not valid',
            () => locationHelper.getLocationsFromGoogle('This is not a valid city')
                .then(r => geocodeApiFormattingHelper.getFormattedLocations(r))
                .then((res) => {
                    assert.equal(res.length, 0);
                }));
    });
    describe('getFormattedLocations', () => {
        it('checks the correct behavior', () => {
            const searchTerm = 'henrique surerus jf';
            return db.geo_location_cache.findOne({ search: searchTerm })
                .then((r) => {
                    assert.isNotOk(r);
                })
                .then(() => locationHelper.getFormattedLocations(searchTerm, false, db))
                .then((l) => {
                    assert.equal(1, l.length);
                })
                .then(() => db.geo_location_cache.findOne({ search: searchTerm }))
                .then((r) => {
                    assert.ok(r);
                });
        });
    });
    describe('saveLocation', () => {

        it('default case', () => {
            locationHelper.saveLocation('Rua Morais e Castro, 300, Passos, Juiz de Fora, MG', db);
        });
    });
});

