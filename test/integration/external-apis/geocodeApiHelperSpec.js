import { assert } from 'chai';
import geocodeApiHelper from '../../../src/server/helpers/geocodeApiHelper';

describe('geocodeApiHelper', () => {
    it('Should work with propertly formatted address', (done) => {
        geocodeApiHelper.getAddresses('Rua Henrique Surerus, 28, Juiz de Fora, MG')
            .then((res) => {
                assert.equal(res.length, 1);
                assert.equal(res[0].friendlyName, 'Rua Henrique Surerus, 28, Centro, Juiz de Fora, MG');
                assert.equal(res[0].id, 'Rua Henrique Surerus, 28 - Centro, Juiz de Fora - MG, Brazil');
                done();
            })
            .catch(done);
    });
    it('Should work with propertly poorly formatted address', (done) => {
        geocodeApiHelper.getAddresses(' r Henrique Surerus, 28  Juiz de Fora, /')
            .then((res) => {
                assert.equal(res.length, 1);
                assert.equal(res[0].friendlyName, 'Rua Henrique Surerus, 28, Centro, Juiz de Fora, MG');
                assert.equal(res[0].id, 'Rua Henrique Surerus, 28 - Centro, Juiz de Fora - MG, Brazil');
                done();
            })
            .catch(done);
    });
    it('Should work with propertly poorly formatted address 2', (done) => {
        geocodeApiHelper.getAddresses('Henrique Surerus JF')
            .then((res) => {
                assert.equal(res.length, 1);
                assert.equal(res[0].friendlyName, 'Rua Henrique Surerus, Centro, Juiz de Fora, MG');
                assert.equal(res[0].id, 'Rua Henrique Surerus - Centro, Juiz de Fora - MG, Brazil');
                done();
            })
            .catch(done);
    });
    it('Should work with landmarks', (done) => {
        geocodeApiHelper.getAddresses('Shopping Alameda JF')
            .then((res) => {
                assert.equal(res.length, 1);
                assert.equal(res[0].friendlyName, 'Rua Morais e Castro, 300, Passos, Juiz de Fora, MG');
                assert.equal(res[0].id, 'R. Morais e Castro, 300 - Passos, Juiz de Fora - MG, 36026-500, Brazil');
                done();
            })
            .catch(done);
    });

    it('Should work with city only', (done) => {
        geocodeApiHelper.getAddresses('Juiz de Fora MG')
            .then((res) => {
                assert.equal(res.length, 1);
                assert.equal(res[0].friendlyName, 'Juiz de Fora, MG');
                assert.equal(res[0].id, 'Juiz de Fora, MG, Brazil');
                done();
            })
            .catch(done);
    });

    it('Should work with double country', (done) => {
        geocodeApiHelper.getAddresses('Juiz de Fora MG Brazil Brazil')
            .then((res) => {
                assert.equal(res.length, 1);
                assert.equal(res[0].friendlyName, 'Juiz de Fora, MG');
                assert.equal(res[0].id, 'Juiz de Fora, MG, Brazil');
                done();
            })
            .catch(done);
    });

    it('Should when the address is not valid', (done) => {
        geocodeApiHelper.getAddresses('This is not a valid city')
            .then((res) => {
                assert.equal(res.length, 0);
                done();
            })
            .catch(done);
    });
});

