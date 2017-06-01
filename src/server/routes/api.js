import express from 'express';
import * as apiHelper from '../helpers/apiHelper';
import * as searchHelper from '../helpers/searchHelper';
import * as locationHelper from '../helpers/locationHelper';
import { extractUserNameFromEmail } from '../helpers/userHelper';

const router = express.Router();

router.route('/address').get((req, res) => {
    const allowCities = req.query.allowcities;
    apiHelper.sendPromiseDb(res, db => locationHelper.getFormattedLocations(req.query.q, allowCities, db));
});

router.route('/professions').get((req, res) => {
    apiHelper.sendPromiseDb(res,
        db => db.search_professions(searchHelper.convertToTsVector(searchHelper.normalize(req.query.q)))
            .then(r => r.map((ri) => {
                const gender = req.user.gender;
                return gender === 0 ? ri.name_canonical : ri.name_feminine;
            }))
    );
});

router.route('/users/checkname').get((req, res) => {
    apiHelper.sendPromiseDb(res,
        (db) => {
            const user = req.user ? req.user : null;
            if (user === null) {
                throw Error('The user is not logged in');
            }
            const userName = req.query.q;
            const id = user.id;

            return db.isUserNameAvailable(userName, id)
                .then(data => data[0]);
        });
});

router.route('/users/getmyprofiledataforediting').get((req, res) => {
    apiHelper.sendPromiseDb(res,
        (db) => {
            const user = req.user ? req.user : null;
            if (user === null) {
                throw Error('the user is not logged in');
            }
            return db.user.findOne({ id: user.id })
                .then((u) => {
                    if (u) {
                        return {
                            id: u.id,
                            name: extractUserNameFromEmail(u.email),
                            displayName: u.display_name,
                            photoUrl: u.photo_url,
                            type: u.type
                        };
                    }
                    throw Error('could not find user');
                });
        });
});

/**
 * Get user
 */
router.route('/users/:id').get((req, res) => {
    apiHelper.sendPromiseDb(res,
        (db) => {
            const entityId = req.params.id;
            return db.user.findOne({ id: entityId })
                .then((u) => {
                    if (u) return u;
                    throw Error('could not find user');
                });
        });
});

export default router;
