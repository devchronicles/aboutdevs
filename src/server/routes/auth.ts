import * as express from 'express';
import * as passport from 'passport';
import buildDb from '../db/buildDb';
import { redirectToHome, redirectToProfileEdit } from '../helpers/urlHelper';

const router = express.Router();

router.route('/google/callback').get(passport.authenticate('google', {
    failureRedirect: '/error'
}), (req, res) => {
    // this is a hack, I'm storing this value just so I can obtain it back
    // in my own connect-middleware on every request
    req.session.userId = req.user;
    res.redirect('/auth/verifyuserprofile');
});

router.route('/google').get(passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email']
}));

/**
 * Called after a successful authentication.
 */
router.route('/verifyuserprofile').get((req, res) => {
    const user = req.user ? req.user : null;

    if (!user || !user.id) {
        redirectToHome(res);
    } else {
        buildDb()
            .then(db =>
                db.user.findOne({ id: user.id })
                    .then((u) => {
                        if (u) {
                            if (u.status === 0) {
                                // the user needs to update their profile
                                redirectToProfileEdit(res);
                            } else {
                                redirectToHome(res);
                            }
                        } else {
                            // todo: Log error here
                            redirectToHome(res);
                        }
                    })
            );
    }
});

router.get('/logout', (req, res) => {
    req.logout();
    redirectToHome(res);
});

export default router;
