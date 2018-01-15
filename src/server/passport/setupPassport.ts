import * as passport from "passport";
import { OAuth2Strategy as GoogleStrategy } from "passport-google-oauth";
import { OAuth2Strategy as LinkedInStrategy } from "passport-linkedin-oauth2";
import buildDb from "../db/buildDb";
import * as userHelper from "../services/userService";
import * as googleOAuthTypes from "../typings/googleOAuthTypes";
import { findOrCreateFromGoogleProfile } from "../services/googleOAuthService";
import { findOrCreateFromLinkedInProfile } from "../services/linkedInOAuthService";

const baseUrl = process.env.NODE_ENV === "production" ? "https://aboutdevs.com" : "http://127.0.0.1:4000";

/**
 * Setups up passport
 * @param passportInstance
 */
export default function (passportInstance: passport.PassportStatic) {
    if (!passportInstance) throw Error("'passport' should be truthy");

    passportInstance.serializeUser((userId, done) => {
        done(null, userId);
    });

    passportInstance.deserializeUser((userId, done) => {
        buildDb()
            .then((db) => db.user.findOne({id: userId})
                .then((u) => (u ? userHelper.getReduxDataForLoggedUser(u) : null))
                .then((u) => done(null, u))
                .catch(done),
            );
    });

    // sets up passport for Google
    passportInstance.use(new GoogleStrategy(
        {
            clientID: "856145944225-c4eivelu0ktapnnt2d1qlms737kv9v0k.apps.googleusercontent.com",
            clientSecret: "0RSivJavPFZIkPlPIWMTSLzO",
            callbackURL: `${baseUrl}/auth/google/callback`,
        },
        async (accessToken, refreshToken, profile: googleOAuthTypes.GoogleOAuthProfile, done) => {
            try {
                const db = await buildDb();
                const user = await findOrCreateFromGoogleProfile(db, profile);
                done(null, user.id);
            } catch (ex) {
                done(ex);
            }
        },
    ));

    // sets up passport for LinkedIn
    passportInstance.use(new LinkedInStrategy(
        {
            clientID: "78noh1ykaqsz15",
            clientSecret: "4eBPrUndcmjO12xE",
            callbackURL: `${baseUrl}/auth/linkedin/callback`,
            scope: ["r_emailaddress", "r_basicprofile"],
        },
        async (accessToken, refreshToken, profile: any, done) => {
            try {
                const db = await buildDb();
                const user = await findOrCreateFromLinkedInProfile(db, profile._json);
                done(null, user.id);
            } catch (ex) {
                done(ex);
            }
        },
    ));
}
