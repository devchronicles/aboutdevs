import express from 'express';
import db from '../db/db';
import fbinder from '../expressMassiveBinders/functionBinder';

const router = express.Router();


/**
 * Test API
 */
router.route('/cities').get(fbinder.bind(q => q.q, db.search_cities, (q) => {
    const criteria = q.q ? q.q.replace(/[^a-zA-Z0-9\s]/g, '') : '';
    const finalCriteria = `'${criteria}':*`;
    return finalCriteria;
}));

/**
 * Get user
 */
router.route('/users/:id').get((req, res) => {
    const entityId = req.params.id;
    db.user.findOneAsync({ id: entityId })
        .then((u) => {
            if (u) { res.status(200).send(u); } else {
                res.status(404).send({
                    error: 'Could not find user'
                });
            }
        });
});

router.route('/users/getmyprofiledataforediting').get((req, res) => {
    const user = req.user ? req.user : null;
    if (user === null) {
        throw Error('No user is logged in');
    }
    console.log(user);
    db.user.findOneAsync({ id: user.id })
        .then((u) => {
            if (u) {
                res.status(200).send({
                    id: u.id,
                    name: '',
                    displayName: u.displayName,
                    photoUrl: u.photoUrl
                });
            } else {
                res.status(404).send({
                    error: 'Could not find user'
                });
            }
        });
});

export default router;
