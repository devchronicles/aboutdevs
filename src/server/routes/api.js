import express from 'express';
import db from '../db/db';
import sqlFunctionBinder from '../expressMassiveBinders/sqlFunctionBinder';
import * as apiHelper from '../helpers/apiHelper';
import * as searchHelper from '../helpers/searchHelper';
import * as geocodeApiHelper from '../helpers/geocodeApiHelper';
import { extractUserNameFromEmail } from '../helpers/userHelper';

const router = express.Router();

router.route('/address').get((req, res) => {
    const allowCities = req.query.allowcities;
    apiHelper.sendPromise(res, geocodeApiHelper.getAddresses(req.query.q, allowCities, db));
});

router.route('/professions').get(
    sqlFunctionBinder.bind(q => q.q, db.search_professions,
        q => [searchHelper.convertToTsVector(searchHelper.normalize(q.q))],
        r => (r.name_canonical)
    ));

router.route('/users/checkname').get((req, res) => {
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
                        name: extractUserNameFromEmail(u.email),
                        displayName: u.display_name,
                        photoUrl: u.photo_url,
                        type: u.type
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
                        name: extractUserNameFromEmail(u.email),
                        displayName: u.display_name,
                        photoUrl: u.photo_url,
                        type: u.type
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
