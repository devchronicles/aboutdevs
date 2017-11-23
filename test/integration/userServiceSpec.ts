import {assert} from "chai";
import * as userHelper from "../../src/server/services/userService";
import * as serverTypes from "../../src/server/typings";
import googleProfileSample from "./resources/googleProfileSample";
import setupSession from "./setupSession";
import * as commonTypes from "../../src/common/typings/commonTypes";

describe("userService", () => {
    let db: serverTypes.TazzoDatabase = null;
    setupSession(before, after, beforeEach, afterEach, ($db) => {
        db = $db;
    });
    describe("getValidUserName", () => {
        it("When it doesn't exist", () => userHelper.getValidUserName(db, "foo").then((userName) => {
                assert.equal(userName, "foo");
            }),
        );
        it("When it does exist", () =>
            db.user.insert({
                name: "foo",
                gender: 0,
                display_name: "Foo",
                email: "foo@fooland.com",
                photo_url: "foo.com/image.jpeg",
            })
                .then(() => userHelper.getValidUserName(db, "foo"))
                .then((userName) => {
                    assert.equal(userName, "foo1");
                }),
        );

        it("When it does exist 2", () =>
            db.user.insert({
                name: "foo",
                gender: 0,
                display_name: "Foo",
                email: "foo@fooland.com",
                photo_url: "foo.com/image.jpeg",
            })
                .then(() => db.user.insert({
                    name: "foo1",
                    gender: 0,
                    display_name: "Foo",
                    email: "foo2@fooland.com",
                    photo_url: "foo.com/image.jpeg",
                }))
                .then(() => userHelper.getValidUserName(db, "foo"))
                .then((userName) => {
                    assert.equal(userName, "foo2");
                }),
        );
    });
    describe("createFromGoogleProfile", () => {
        it("Basic scenario", () =>
            userHelper.createFromGoogleProfile(db, googleProfileSample)
                .then((u) => {
                    assert.isOk(u);
                    // let's go to the database to see if the user has actually been added
                    return db.user.findOne(u.id);
                })
                .then((u) => {
                    assert.isOk(u);
                    assert.isOk(u.oauth_profiles);
                    assert.strictEqual(u.oauth_profiles.google.id, "109199054588840596357");
                    return db.user.destroy({id: u.id});
                }),
        );
    });
    describe("updateFromGoogleProfile", () => {
        it("Basic scenario", async () => {
            let user = (await db.user.save({
                name: "andrerpena",
                gender: 0,
                email: "andrerpena@gmail.com",
                display_name: "André Pena",
                photo_url: "foo.com/image.jpeg",
            })) as serverTypes.User;

            user = await userHelper.updateFromGoogleProfile(db, user, googleProfileSample);

            assert.isOk(user);
            assert.isOk(user.oauth_profiles);
            assert.strictEqual(user.oauth_profiles.google.id, "109199054588840596357");
            await db.user.destroy({id: user.id});
        });
    });
    describe("findOrCreateFromGoogleProfile", () => {
        it("when the user did not exist yet", () =>
            db.user.findOne({email: "andrerpena@gmail.com"})
                .then((u: serverTypes.User) => {
                    assert.isUndefined(u);
                    return userHelper.findOrCreateFromGoogleProfile(db, googleProfileSample);
                })

                .then((u: serverTypes.User) => {
                    assert.strictEqual(u.email, "andrerpena@gmail.com");
                    return db.user.destroy({id: u.id});
                }),
        );
        it("when a user with the same e-mail address already existed", () =>
            db.user.save({
                name: "andrerpena",
                gender: 0,
                email: "andrerpena@gmail.com",
                display_name: "André Pena",
                photo_url: "foo.com/image.jpeg",
            })
                .then(() => userHelper.findOrCreateFromGoogleProfile(db, googleProfileSample))
                .then((u) => {
                    assert.strictEqual(u.email, "andrerpena@gmail.com");
                    assert.ok(u.oauth_profiles.google);
                    return db.user.destroy({id: u.id});
                }),
        );
    });
    describe("saveProfile", () => {
        it("Basic scenario", async () => {
            const user = (await db.user.insert({
                name: "andrerpena",
                gender: 0,
                email: "andrerpena@gmail.com",
                display_name: "André Pena",
                photo_url: "foo.com/image.jpeg",
            })) as serverTypes.User;

            const profile = {
                name: "andrerpena",
                displayName: "André Pena",
                type: 1,
                bio: "Great developer",
                activities: "Great software",
                phone_whatsapp: "(32) 999168205",
                address: "Rua Henrique Surerus, 28, Juiz de Fora",
                profession: "medico",
            };

            await userHelper.saveProfile(db, user.id, profile);
        });

        it("Multiple services", async () => {
            const user = (await db.user.insert({
                name: "andrerpena",
                gender: 0,
                email: "andrerpena@gmail.com",
                display_name: "André Pena",
                photo_url: "foo.com/image.jpeg",
            })) as serverTypes.User;

            const profile: commonTypes.UserProfile = {
                name: "andrerpena",
                displayName: "André Pena",
                type: 1,
                bio: "Great developer",
                activities: "Great software",
                phone_whatsapp: "(32) 999168205",
                address: "Rua Henrique Surerus, 28, Juiz de Fora",
                profession: "medico",
                services: [
                    {
                        service: "Cirurgia",
                        index: 1,
                    },
                    {
                        service: "Anestesia",
                        index: 2,
                    },
                ],
            };

            await userHelper.saveProfile(db, user.id, profile);
            assert.strictEqual(await db.user_service.count({user_id: user.id}), "2");
        });
    });
});
