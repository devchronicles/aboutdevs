import { assert } from "chai";
import * as userHelper from "../../src/server/services/userService";
import * as serverTypes from "../../src/server/typings";
import linkedInSampleProfile from "./resources/linkedInProfileSample";
import setupSession from "./setupSession";
import * as commonTypes from "../../src/common/typings/commonTypes";
import * as googlePlacesService from "../../src/server/services/locationService";
import {
    createFromLinkedInProfile,
    findOrCreateFromLinkedInProfile,
    updateFromLinkedInProfile,
} from "../../src/server/services/linkedInOAuthService";
import { UserCv } from "../../src/common/typings";

describe("userService", () => {
    let db: serverTypes.AboutDevsDatabase = null;
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
                display_name: "Foo",
                email: "foo@fooland.com",
                photo_url: "foo.com/image.jpeg",
            })
                .then(() => userHelper.getValidUserName(db, "foo"))
                .then((userName) => {
                    assert.equal(userName, "foo1");
                }),
        );

        it("When it does exist 2", async () => {
            await  db.user.insert({
                name: "foo",
                display_name: "Foo",
                email: "foo@fooland.com",
                photo_url: "foo.com/image.jpeg",
                title: "something",
            });
            await db.user.insert({
                name: "foo1",
                display_name: "Foo",
                email: "foo2@fooland.com",
                photo_url: "foo.com/image.jpeg",
                title: "something",
            });
            const nextValidUserName = await userHelper.getValidUserName(db, "foo");
            assert.equal(nextValidUserName, "foo2");
        });
        describe("createFromLinkedInProfile", () => {
            it("Basic scenario", () =>
                createFromLinkedInProfile(db, linkedInSampleProfile)
                    .then((u) => {
                        assert.isOk(u);
                        // let's go to the database to see if the user has actually been added
                        return db.user.findOne(u.id);
                    })
                    .then((u) => {
                        assert.isOk(u);
                        assert.isOk(u.oauth_profiles);
                        assert.strictEqual(u.oauth_profiles.linkedin.id, "0A5e6_lH2j");
                        return db.user.destroy({id: u.id});
                    }),
            );
        });
        describe("updateFromLinkedInProfile", () => {
            it("Basic scenario", async () => {
                let user = (await db.user.save({
                    name: "andrerpena",
                    email: "andrerpena@gmail.com",
                    display_name: "André Pena",
                    photo_url: "foo.com/image.jpeg",
                })) as serverTypes.User;

                user = await updateFromLinkedInProfile(db, user, linkedInSampleProfile);

                assert.isOk(user);
                assert.isOk(user.oauth_profiles);
                assert.strictEqual(user.oauth_profiles.linkedin.id, "0A5e6_lH2j");
                await db.user.destroy({id: user.id});
            });
        });
        describe("findOrCreateFromLinkedInProfile", () => {
            it("when the user did not exist yet", () =>
                db.user.findOne({email: "andrerpena@gmail.com"})
                    .then((u: serverTypes.User) => {
                        assert.isNull(u);
                        return findOrCreateFromLinkedInProfile(db, linkedInSampleProfile);
                    })

                    .then((u: serverTypes.User) => {
                        assert.strictEqual(u.email, "andrerpena@gmail.com");
                        return db.user.destroy({id: u.id});
                    }),
            );
            it("when a user with the same e-mail address already existed", () =>
                db.user.save({
                    name: "andrerpena",
                    email: "andrerpena@gmail.com",
                    display_name: "André Pena",
                    photo_url: "foo.com/image.jpeg",
                })
                    .then(() => findOrCreateFromLinkedInProfile(db, linkedInSampleProfile))
                    .then((u) => {
                        assert.strictEqual(u.email, "andrerpena@gmail.com");
                        assert.ok(u.oauth_profiles.linkedin);
                        return db.user.destroy({id: u.id});
                    }),
            );
        });
        describe("saveProfile", () => {
            it("Basic scenario", async () => {
                const formattedAddress = (await googlePlacesService.searchLocationsFormatted(db, "Berlin, Germany"))[0];

                const user = (await db.user.insert({
                    name: "andrerpena",
                    email: "andrerpena@gmail.com",
                    display_name: "André Pena",
                    photo_url: "foo.com/image.jpeg",
                    title: "medico",
                })) as serverTypes.User;

                const profile = {
                    name: "andrerpena",
                    displayName: "André Pena",
                    type: commonTypes.UserProfileType.DEVELOPER,
                    bio: {text: "Great developer"},
                    address: "Rua Henrique Surerus, 28, Juiz de Fora",
                    title: "medico",
                    formattedAddress,
                    cv: null as UserCv,
                };

                await userHelper.saveProfile(db, user.id, profile, null);
            });
        });
    });
});
