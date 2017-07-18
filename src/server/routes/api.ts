import * as express from 'express';
import * as apiHelper from '../helpers/apiHelper';
import * as locationHelper from '../services/locationService';
import * as searchHelper from '../helpers/searchHelper';
import * as userHelper from '../services/userService';
import * as dbTypes from '../typings/dbTypes';
import * as stringHelper from '../../common/helpers/stringHelper';

const router = express.Router();

router.route('/address').get((req: express.Request, res: express.Response) => {
    const allowCities: boolean = req.query.allowcities;
    apiHelper.sendPromiseDb(res, (db: dbTypes.IndieJobsDatabase) => locationHelper.getFormattedLocations(req.query.q as string, allowCities, db));
});

router.route('/professions').get((req, res) => {
    apiHelper.sendPromiseDb(res,
        async (db: dbTypes.IndieJobsDatabase) => {
            apiHelper.getAndEnsureUserId(req);
            const professions = await db.search_professions(searchHelper.convertToTsVector(stringHelper.normalize(req.query.q)));
            return professions.map((p) => {
                const gender = req.user.gender;
                return gender === 0 ? p.name_canonical : p.name_feminine;
            });
        },
    );
});

router.route('/users/checkname').get((req, res) => {
    apiHelper.sendPromiseDb(res,
        async (db) => {
            const userId = apiHelper.getAndEnsureUserId(req);
            const userName = req.query.q;
            const nameExistsResult = (await db.is_user_name_taken(userName, userId))[0];
            return nameExistsResult.exists;
        });
});

router.route('/users/myprofile').get((req, res) => {
    apiHelper.sendPromiseDb(res,
        async (db) => {
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
        async (db) => {
            apiHelper.getAndEnsureUserId(req);
            const entityId = req.params.id;
            const user = await db.user.findOne({ id: entityId });
            if (user) {
                return user;
            }
            throw Error('could not find user');
        });
});

export default router;
