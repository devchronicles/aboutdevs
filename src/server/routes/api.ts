import * as express from 'express';
import * as apiHelper from '../helpers/apiHelper';
import * as searchHelper from '../helpers/searchHelper';
import * as locationHelper from '../helpers/locationHelper';
import * as userHelper from '../helpers/userHelper';

const router = express.Router();

router.route('/address').get((req, res) => {
    const allowCities = req.query.allowcities;
    apiHelper.sendPromiseDb(res, db => locationHelper.getFormattedLocations(req.query.q, allowCities, db));
});

router.route('/professions').get((req, res) => {
    apiHelper.sendPromiseDb(res,
        (db) => {
            apiHelper.getAndEnsureUserId(req);
            return db.search_professions(searchHelper.convertToTsVector(searchHelper.normalize(req.query.q)))
                .then(r => r.map((ri) => {
                    const gender = req.user.gender;
                    return gender === 0 ? ri.name_canonical : ri.name_feminine;
                }));
        }
    );
});

router.route('/users/checkname').get((req, res) => {
    apiHelper.sendPromiseDb(res,
        (db) => {
            const userId = apiHelper.getAndEnsureUserId(req);
            const userName = req.query.q;
            return db.is_user_name_taken(userName, userId)
                .then(data => !data[0]);
        });
});

router.route('/users/myprofile').get((req, res) => {
    apiHelper.sendPromiseDb(res,
        (db) => {
            const userId = apiHelper.getAndEnsureUserId(req);
            return userHelper.getProfile(db, userId);
        });
});

router.route('/users/myprofile').post((req, res) => {
    apiHelper.sendPromiseDb(res,
        async (db) => {
            if (!req.body) throw Error('profile was not submitted');
            const profile = req.body;
            const userId = apiHelper.getAndEnsureUserId(req);
            const error = await userHelper.validateProfile(db, profile);
            if (Object.keys(error).length) {
                return { error };
            }
            return userHelper.saveProfile(db, userId, profile);
        });
});

/**
 * Get user
 */
router.route('/users/:id').get((req, res) => {
    apiHelper.sendPromiseDb(res,
        (db) => {
            apiHelper.getAndEnsureUserId(req);
            const entityId = req.params.id;
            return db.user.findOne({ id: entityId })
                .then((u) => {
                    if (u) return u;
                    throw Error('could not find user');
                });
        });
});

export default router;
