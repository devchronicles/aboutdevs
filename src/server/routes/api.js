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

export default router;
