import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import buildDb from '../db/buildDb';
import * as userHelper from '../helpers/userHelper';

/**
 * Setups up passport
 * @param passport
 */
export default function (passport) {
    if (!passport) throw Error('\'passport\' should be truthy');

    passport.serializeUser((userId, done) => {
        done(null, userId);
    });

    passport.deserializeUser((userId, done) => {
        buildDb()
            .then(db => db.user.findOne({ id: userId })
                .then(u => (u ? userHelper.getReduxDataForLoggedUser(u) : null))
                .then(u => done(null, u))
                .catch(done)
            );
    });

    // sets up passport for Google
    passport.use(new GoogleStrategy(
        {
            clientID: '856145944225-c4eivelu0ktapnnt2d1qlms737kv9v0k.apps.googleusercontent.com',
            clientSecret: '0RSivJavPFZIkPlPIWMTSLzO',
            callbackURL: 'http://127.0.0.1:4000/auth/google/callback'
        },
        (accessToken, refreshToken, profile, done) => {
            buildDb()
                .then(db =>
                    userHelper.findOrCreateFromGoogleProfile(db, profile)
                        .then(u => done(null, u.id)) // this will call passport.serializeUser
                        .catch(done)
                );
        }
    ));
}
