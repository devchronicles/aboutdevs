import * as passport from 'passport';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import buildDb from '../db/buildDb';
import * as userHelper from '../helpers/userHelper';
import * as dbTypes from '../typings/dbTypes';
import * as googleOAuthTypes from '../typings/googleOAuthTypes';

/**
 * Setups up passport
 * @param passport
 */
export default function(passport: passport.Passport) {
    if (!passport) throw Error('\'passport\' should be truthy');

    passport.serializeUser((userId, done) => {
        done(null, userId);
    });
]
    passport.deserializeUser((userId, done) => {
        buildDb()
            .then((db) => db.user.findOne({ id: userId })
                .then((u) => (u ? userHelper.getReduxDataForLoggedUser(u) : null))
                .then((u) => done(null, u))
                .catch(done),
            );
    });

    // sets up passport for Google
    passport.use(new GoogleStrategy(
        {
            clientID: '856145944225-c4eivelu0ktapnnt2d1qlms737kv9v0k.apps.googleusercontent.com',
            clientSecret: '0RSivJavPFZIkPlPIWMTSLzO',
            callbackURL: 'http://127.0.0.1:4000/auth/google/callback',
        },
        (accessToken, refreshToken, profile: googleOAuthTypes.IGoogleOAuthProfile, done) => {
            buildDb()
                .then((db: dbTypes.IIndieJobsDatabase) =>
                    userHelper.findOrCreateFromGoogleProfile(db, profile)
                        .then((u: dbTypes.IUser) => done(null, u.id)) // this will call passport.serializeUser
                        .catch(done),
                );
        },
    ));
}
