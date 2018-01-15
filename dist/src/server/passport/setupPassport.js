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
const passport_google_oauth_1 = require("passport-google-oauth");
const passport_linkedin_oauth2_1 = require("passport-linkedin-oauth2");
const buildDb_1 = require("../db/buildDb");
const userHelper = require("../services/userService");
const googleOAuthService_1 = require("../services/googleOAuthService");
const linkedInOAuthService_1 = require("../services/linkedInOAuthService");
/**
 * Setups up passport
 * @param passportInstance
 */
function default_1(passportInstance) {
    if (!passportInstance)
        throw Error("'passport' should be truthy");
    passportInstance.serializeUser((userId, done) => {
        done(null, userId);
    });
    passportInstance.deserializeUser((userId, done) => {
        buildDb_1.default()
            .then((db) => db.user.findOne({ id: userId })
            .then((u) => (u ? userHelper.getReduxDataForLoggedUser(u) : null))
            .then((u) => done(null, u))
            .catch(done));
    });
    // sets up passport for Google
    passportInstance.use(new passport_google_oauth_1.OAuth2Strategy({
        clientID: "856145944225-c4eivelu0ktapnnt2d1qlms737kv9v0k.apps.googleusercontent.com",
        clientSecret: "0RSivJavPFZIkPlPIWMTSLzO",
        callbackURL: "http://127.0.0.1:4000/auth/google/callback",
    }, (accessToken, refreshToken, profile, done) => __awaiter(this, void 0, void 0, function* () {
        try {
            const db = yield buildDb_1.default();
            const user = yield googleOAuthService_1.findOrCreateFromGoogleProfile(db, profile);
            done(null, user.id);
        }
        catch (ex) {
            done(ex);
        }
    })));
    // sets up passport for LinkedIn
    passportInstance.use(new passport_linkedin_oauth2_1.OAuth2Strategy({
        clientID: "78noh1ykaqsz15",
        clientSecret: "4eBPrUndcmjO12xE",
        callbackURL: "http://127.0.0.1:4000/auth/linkedin/callback",
        scope: ["r_emailaddress", "r_basicprofile"],
    }, (accessToken, refreshToken, profile, done) => __awaiter(this, void 0, void 0, function* () {
        try {
            const db = yield buildDb_1.default();
            const user = yield linkedInOAuthService_1.findOrCreateFromLinkedInProfile(db, profile._json);
            done(null, user.id);
        }
        catch (ex) {
            done(ex);
        }
    })));
}
exports.default = default_1;
//# sourceMappingURL=setupPassport.js.map