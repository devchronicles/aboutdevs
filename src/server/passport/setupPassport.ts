import * as passport from "passport";
import { OAuth2Strategy as GoogleStrategy } from "passport-google-oauth";
import buildDb from "../db/buildDb";
import * as userHelper from "../services/userService";
import * as dbTypes from "../typings/dbTypes";
import * as googleOAuthTypes from "../typings/googleOAuthTypes";

/**
 * Setups up passport
 * @param passportInstance
 */
export default function(passportInstance: passport.Passport) {
    if (!passportInstance) throw Error("'passport' should be truthy");

    passportInstance.serializeUser((userId, done) => {
        done(null, userId);
    });

    passportInstance.deserializeUser((userId, done) => {
        buildDb()
            .then((db) => db.user.findOne({ id: userId })
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
            callbackURL: "http://127.0.0.1:4000/auth/google/callback",
        },
        (accessToken, refreshToken, profile: googleOAuthTypes.GoogleOAuthProfile, done) => {
            buildDb()
                .then((db: dbTypes.TazzoDatabase) =>
                    userHelper.findOrCreateFromGoogleProfile(db, profile)
                        .then((u: dbTypes.User) => done(null, u.id)) // this will call passport.serializeUser
                        .catch(done),
                );
        },
    ));
}
