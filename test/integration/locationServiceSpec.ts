import { assert } from 'chai';
import * as geocodeApiFormattingHelper from '../../src/server/helpers/geocodeApiFormattingHelper';
import * as locationService from '../../src/server/services/locationService';
import * as serverTypes from '../../src/server/typings';
import setupSession from './setupSession';

describe('locationHelperSpec', () => {
    let db: serverTypes.TazzoDatabase = null;
    setupSession(before, after, beforeEach, afterEach, ($db: serverTypes.TazzoDatabase) => {
        db = $db;
    });
    describe('getLocationsFromGoogle', () => {
        it('Should work with propertly formatted address',
            () => locationService.getLocationsFromGoogle('Rua Henrique Surerus, 28, Juiz de Fora, MG')
                .then((r) => geocodeApiFormattingHelper.getFormattedLocations(r))
                .then((res) => {
                    assert.equal(res.length, 1);
                    assert.equal(res[0], 'Rua Henrique Surerus, 28, Centro, Juiz de Fora, MG');
                }));
        it('Should work with propertly poorly formatted address',
            () => locationService.getLocationsFromGoogle(' r Henrique Surerus, 28  Juiz de Fora, /')
                .then((r) => geocodeApiFormattingHelper.getFormattedLocations(r))
                .then((res) => {
                    assert.equal(res.length, 1);
                    assert.equal(res[0], 'Rua Henrique Surerus, 28, Centro, Juiz de Fora, MG');
                }));
        it('Should work with propertly poorly formatted address 2',
            () => locationService.getLocationsFromGoogle('Henrique Surerus JF')
                .then((r) => geocodeApiFormattingHelper.getFormattedLocations(r))
                .then((res) => {
                    assert.equal(res.length, 1);
                    assert.equal(res[0], 'Rua Henrique Surerus, Centro, Juiz de Fora, MG');
                }));
        it('Should work with landmarks',
            () => locationService.getLocationsFromGoogle('Shopping Alameda JF')
                .then((r) => geocodeApiFormattingHelper.getFormattedLocations(r))
                .then((res) => {
                    assert.equal(res.length, 1);
                    assert.equal(res[0], 'Rua Morais e Castro, 300, Passos, Juiz de Fora, MG');
                }));

        it('Should not work with city only by default',
            () => locationService.getLocationsFromGoogle('Juiz de Fora MG')
                .then((r) => geocodeApiFormattingHelper.getFormattedLocations(r))
                .then((res) => {
                    assert.equal(res.length, 0);
                }));

        it('Should work with city only when specified',
            () => locationService.getLocationsFromGoogle('Juiz de Fora MG')
                .then((r) => geocodeApiFormattingHelper.getFormattedLocations(r, true))
                .then((res) => {
                    assert.equal(res.length, 1);
                }));

        it('Should work when the address is not valid',
            () => locationService.getLocationsFromGoogle('This is not a valid city')
                .then((r) => geocodeApiFormattingHelper.getFormattedLocations(r))
                .then((res) => {
                    assert.equal(res.length, 0);
                }));
    });
    describe('getFormattedLocations', () => {
        it('checks the correct behavior', async () => {
            const searchTerm = 'henrique surerus jf';
            let locationCache = await db.geo_location_cache.findOne({ search: searchTerm });
            assert.isNotOk(locationCache);
            const formattedLocations = await locationService.getFormattedLocations(searchTerm, false, db);
            assert.equal(1, formattedLocations.length);
            locationCache = await db.geo_location_cache.findOne({ search: searchTerm });
            assert.ok(locationCache);
        });
    });
    describe('saveAddress', () => {
        it('default case', async () => {
            const locationFormattedAddress = 'Rua Morais e Castro, 300, Passos, Juiz de Fora, MG';
            const savedLocation = await locationService.saveAddress(db, 'Rua Morais e Castro, 300, Passos, Juiz de Fora, MG');
            assert.equal(savedLocation.formatted_address, locationFormattedAddress);
        });
    });
});
