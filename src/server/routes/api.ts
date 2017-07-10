import * as express from 'express';
import * as apiHelper from '../helpers/apiHelper';
import * as locationHelper from '../helpers/locationHelper';
import * as searchHelper from '../helpers/searchHelper';
import * as userHelper from '../helpers/userHelper';
import * as dbTypes from '../typings/dbTypes';

const router = express.Router();

router.route('/address').get((req: express.Request, res: express.Response) => {
    const allowCities: boolean = req.query.allowcities;
    apiHelper.sendPromiseDb(res, (db: dbTypes.IndieJobsDatabase) => locationHelper.getFormattedLocations(req.query.q as string, allowCities, db));
});

router.route('/professions').get((req, res) => {
    apiHelper.sendPromiseDb(res,
        (db: dbTypes.IndieJobsDatabase) => {
            apiHelper.getAndEnsureUserId(req);
            return db.search_professions(searchHelper.convertToTsVector(searchHelper.normalize(req.query.q)))
                .then((r) => r.map((ri) => {
                    const gender = req.user.gender;
                    return gender === 0 ? ri.name_canonical : ri.name_feminine;
                }));
        },
    );
});

router.route('/users/checkname').get((req, res) => {
    apiHelper.sendPromiseDb(res,
        (db) => {
            const userId = apiHelper.getAndEnsureUserId(req);
            const userName = req.query.q;
            return db.is_user_name_taken(userName, userId)
                .then((data) => !data[0]);
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
            const errors = await userHelper.validateProfile(db, profile);
            if (Object.keys(errors).length) {
                return { errors };
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
