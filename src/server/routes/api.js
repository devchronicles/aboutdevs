import express from 'express';
import db from '../db/db';
import fbinder from '../expressMassiveBinders/functionBinder';
import * as apiHelper from '../apiHelper';

const router = express.Router();

/**
 * Test API
 */
router.route('/cities').get(fbinder.bind(q => q.q, db.search_cities, (q) => {
    const criteria = q.q ? q.q.replace(/[^a-zA-Z0-9\s]/g, '') : '';
    const finalCriteria = `'${criteria}':*`;
    return finalCriteria;
}));

router.route('/users/getmyprofiledataforediting').get((req, res) => {
    try {
        const user = req.user ? req.user : null;
        if (user === null) {
            throw Error('The user is not logged in');
        }
        db.user.findOneAsync({ id: user.id })
            .then((u) => {
                if (u) {
                    apiHelper.sendOk(res, {
                        id: u.id,
                        name: '',
                        displayName: u.display_name,
                        photoUrl: u.photo_url
                    });
                } else {
                    apiHelper.sendError(res, 'Could not find user');
                }
            })
            .catch(apiHelper.apiExceptionCatcher(res));
    } catch (ex) {
        apiHelper.sendError(res, ex);
    }
});

/**
 * Get user
 */
router.route('/users/:id').get((req, res) => {
    try {
        const entityId = req.params.id;
        db.user.findOneAsync({ id: entityId })
            .then((u) => {
                if (u) {
                    apiHelper.sendOk(res, u);
                } else {
                    apiHelper.sendError(res, 'Could not find user');
                }
            })
            .catch(apiHelper.apiExceptionCatcher(res));
    } catch (ex) {
        apiHelper.sendError(res, ex);
    }
});

export default router;
