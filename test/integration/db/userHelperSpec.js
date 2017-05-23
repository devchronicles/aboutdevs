import { assert } from 'chai';
import setupSession from './setupSession';
import googleProfileSample from './resources/googleProfileSample';
import * as userHelper from '../../../src/server/helpers/userHelper';


describe('userHelper', () => {
    let db = null;
    setupSession(before, after, beforeEach, afterEach, ($db) => {
        db = $db;
    });

    describe('getValidUserName', () => {
        it('When it doesn\'t exist', () =>
            userHelper.getValidUserName(db, 'foo')
                .then((userName) => { assert.equal(userName, 'foo'); })
        );
        it('When it does exist', () =>
            db.user.insertAsync({
                name: 'foo',
                display_name: 'Foo',
                email: 'foo@fooland.com'
            })
                .then(() => userHelper.getValidUserName(db, 'foo'))
                .then((userName) => { assert.equal(userName, 'foo1'); })
        );
        it('When it does exist 2', () =>
            db.user.insertAsync({
                name: 'foo',
                display_name: 'Foo',
                email: 'foo@fooland.com'
            })
                .then(() => db.user.insertAsync({
                    name: 'foo1',
                    display_name: 'Foo',
                    email: 'foo2@fooland.com'
                }))
                .then(() => userHelper.getValidUserName(db, 'foo'))
                .then((userName) => { assert.equal(userName, 'foo2'); })
        );
    });

    it('createFromGoogleProfile', () =>
        userHelper.createFromGoogleProfile(db, googleProfileSample)
            .then((u) => {
                assert.isOk(u);
                // let's go to the database to see if the user has actually been added
                return db.user.findOneAsync(u.id);
            })
            .then((u) => {
                assert.isOk(u);
                assert.isOk(u.oauth_profiles);
                assert.strictEqual(u.oauth_profiles.google.id, '109199054588840596357');
                return db.user.destroyAsync({ id: u.id });
            })
    );

    it('updateFromGoogleProfile', () =>
        db.user.saveAsync({
            name: 'andrerpena',
            email: 'andrerpena@gmail.com',
            display_name: 'André Pena'
        })
            .then(u => userHelper.updateFromGoogleProfile(db, u, googleProfileSample))
            .then((u) => {
                assert.isOk(u);
                assert.isOk(u.oauth_profiles);
                assert.strictEqual(u.oauth_profiles.google.id, '109199054588840596357');
                return db.user.destroyAsync({ id: u.id });
            })
    );

    describe('findOrCreateFromGoogleProfile', () => {
        it('when the user did not exist yet', (done) => {
            db.user.findOneAsync({ email: 'andrerpena@gmail.com' })
                .then((u) => {
                    assert.isUndefined(u);
                    return userHelper.findOrCreateFromGoogleProfile(db, googleProfileSample);
                })
                .then((u) => {
                    assert.strictEqual(u.email, 'andrerpena@gmail.com');
                    return db.user.destroyAsync({ id: u.id });
                })
                .then(() => done())
                .catch(done);
        });
        it('when a user with the same e-mail address already existed', () =>
            db.user.saveAsync({
                name: 'andrerpena',
                email: 'andrerpena@gmail.com',
                display_name: 'André Pena'
            })
                .then(() => userHelper.findOrCreateFromGoogleProfile(db, googleProfileSample))
                .then((u) => {
                    assert.strictEqual(u.email, 'andrerpena@gmail.com');
                    assert.ok(u.oauth_profiles.google);
                    return db.user.destroyAsync({ id: u.id });
                })
        );
    });
});
