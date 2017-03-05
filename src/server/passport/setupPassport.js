import { Strategy as GoogleStrategy } from 'passport-google-oauth';
import db from '../db/db';
import { findOrCreateFromGoogleProfile } from '../db/entityHelpers/userHelper';

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
        db.user.findOneAsync({ id: userId })
            .then(u => done(null, u))
            .catch(done);
    });

    // sets up passport for Google
    passport.use(new GoogleStrategy(
        {
            clientID: '856145944225-c4eivelu0ktapnnt2d1qlms737kv9v0k.apps.googleusercontent.com',
            clientSecret: '0RSivJavPFZIkPlPIWMTSLzO',
            callbackURL: 'http://127.0.0.1:4000/auth/google/callback'
        },
        (accessToken, refreshToken, profile, done) => {
            findOrCreateFromGoogleProfile(db, profile)
                .then(u => done(null, u.id))
                .catch(done);
        }
    ));
}
