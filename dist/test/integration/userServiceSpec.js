"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const userHelper = require("../../src/server/services/userService");
const linkedInProfileSample_1 = require("./resources/linkedInProfileSample");
const setupSession_1 = require("./setupSession");
const commonTypes = require("../../src/common/typings/commonTypes");
const googlePlacesService = require("../../src/server/services/googlePlacesService");
const linkedInOAuthService_1 = require("../../src/server/services/linkedInOAuthService");
describe("userService", () => {
    let db = null;
    setupSession_1.default(before, after, beforeEach, afterEach, ($db) => {
        db = $db;
    });
    describe("getValidUserName", () => {
        it("When it doesn't exist", () => userHelper.getValidUserName(db, "foo").then((userName) => {
            chai_1.assert.equal(userName, "foo");
        }));
        it("When it does exist", () => db.user.insert({
            name: "foo",
            display_name: "Foo",
            email: "foo@fooland.com",
            photo_url: "foo.com/image.jpeg",
        })
            .then(() => userHelper.getValidUserName(db, "foo"))
            .then((userName) => {
            chai_1.assert.equal(userName, "foo1");
        }));
        it("When it does exist 2", () => __awaiter(this, void 0, void 0, function* () {
            yield db.user.insert({
                name: "foo",
                display_name: "Foo",
                email: "foo@fooland.com",
                photo_url: "foo.com/image.jpeg",
                title: "something",
            });
            yield db.user.insert({
                name: "foo1",
                display_name: "Foo",
                email: "foo2@fooland.com",
                photo_url: "foo.com/image.jpeg",
                title: "something",
            });
            const nextValidUserName = yield userHelper.getValidUserName(db, "foo");
            chai_1.assert.equal(nextValidUserName, "foo2");
        }));
        describe("createFromLinkedInProfile", () => {
            it("Basic scenario", () => linkedInOAuthService_1.createFromLinkedInProfile(db, linkedInProfileSample_1.default)
                .then((u) => {
                chai_1.assert.isOk(u);
                // let's go to the database to see if the user has actually been added
                return db.user.findOne(u.id);
            })
                .then((u) => {
                chai_1.assert.isOk(u);
                chai_1.assert.isOk(u.oauth_profiles);
                chai_1.assert.strictEqual(u.oauth_profiles.linkedin.id, "0A5e6_lH2j");
                return db.user.destroy({ id: u.id });
            }));
        });
        describe("updateFromLinkedInProfile", () => {
            it("Basic scenario", () => __awaiter(this, void 0, void 0, function* () {
                let user = (yield db.user.save({
                    name: "andrerpena",
                    email: "andrerpena@gmail.com",
                    display_name: "André Pena",
                    photo_url: "foo.com/image.jpeg",
                }));
                user = yield linkedInOAuthService_1.updateFromLinkedInProfile(db, user, linkedInProfileSample_1.default);
                chai_1.assert.isOk(user);
                chai_1.assert.isOk(user.oauth_profiles);
                chai_1.assert.strictEqual(user.oauth_profiles.linkedin.id, "0A5e6_lH2j");
                yield db.user.destroy({ id: user.id });
            }));
        });
        describe("findOrCreateFromLinkedInProfile", () => {
            it("when the user did not exist yet", () => db.user.findOne({ email: "andrerpena@gmail.com" })
                .then((u) => {
                chai_1.assert.isNull(u);
                return linkedInOAuthService_1.findOrCreateFromLinkedInProfile(db, linkedInProfileSample_1.default);
            })
                .then((u) => {
                chai_1.assert.strictEqual(u.email, "andrerpena@gmail.com");
                return db.user.destroy({ id: u.id });
            }));
            it("when a user with the same e-mail address already existed", () => db.user.save({
                name: "andrerpena",
                email: "andrerpena@gmail.com",
                display_name: "André Pena",
                photo_url: "foo.com/image.jpeg",
            })
                .then(() => linkedInOAuthService_1.findOrCreateFromLinkedInProfile(db, linkedInProfileSample_1.default))
                .then((u) => {
                chai_1.assert.strictEqual(u.email, "andrerpena@gmail.com");
                chai_1.assert.ok(u.oauth_profiles.linkedin);
                return db.user.destroy({ id: u.id });
            }));
        });
        describe("saveProfile", () => {
            it("Basic scenario", () => __awaiter(this, void 0, void 0, function* () {
                const formattedAddress = (yield googlePlacesService.searchCitiesFormatted(db, "Berlin, Germany"))[0];
                const user = (yield db.user.insert({
                    name: "andrerpena",
                    email: "andrerpena@gmail.com",
                    display_name: "André Pena",
                    photo_url: "foo.com/image.jpeg",
                    title: "medico",
                }));
                const profile = {
                    name: "andrerpena",
                    displayName: "André Pena",
                    type: commonTypes.UserProfileType.DEVELOPER,
                    bio: { text: "Great developer" },
                    address: "Rua Henrique Surerus, 28, Juiz de Fora",
                    title: "medico",
                    formattedAddress,
                };
                yield userHelper.saveProfile(db, user.id, profile);
            }));
        });
    });
});
//# sourceMappingURL=userServiceSpec.js.map