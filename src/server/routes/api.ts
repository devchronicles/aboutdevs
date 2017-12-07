import * as express from "express";
import * as apiHelper from "../helpers/apiHelper";
import * as tagService from "../services/tagService";
import * as locationService from "../services/locationService";
import * as userService from "../services/userService";
import * as dbTypes from "../typings/dbTypes";
import * as commonTypes from "../../common/typings/commonTypes";

const router = express.Router();

router.route("/addresses").get(async (req: express.Request, res: express.Response) => {
    const allowCities: boolean = req.query.allowcities;
    await apiHelper.sendDbConnectedPromise(res,
        (db: dbTypes.AboutDevsDatabase) => locationService.searchLocationsFormatted(db, req.query.q as string, allowCities));
});

router.route("/tags").get(async (req, res) => {
    await apiHelper.sendDbConnectedPromise(res,
        async (db: dbTypes.AboutDevsDatabase) => {
            apiHelper.getAndEnsureUserId(req);
            return tagService.searchTagsFormatted(db, req.query.q as string);
        });
});

router.route("/users/check_name").get(async (req, res) => {
    await apiHelper.sendDbConnectedPromise(res,
        async (db) => {
            const userId = apiHelper.getAndEnsureUserId(req);
            const userName = req.query.q;
            const nameExistsResult = (await db.is_user_name_taken(userName, userId))[0];
            return nameExistsResult.exists;
        });
});

router.route("/users/edit_my_profile").get(async (req, res) => {
    await apiHelper.sendDbConnectedPromise(res,
        async (db) => {
            const userId = apiHelper.getAndEnsureUserId(req);
            return userService.getUserProfileById(db, userId, userId, commonTypes.Operation.EDIT);
        });
});

router.route("/users/edit_my_profile").post(async (req, res) => {
    await apiHelper.sendDbConnectedPromise(res,
        async (db) => {
            if (!req.body) throw Error("profile was not submitted");
            const profile = req.body;
            const userId = apiHelper.getAndEnsureUserId(req);
            const errors = await userService.validateProfile(db, profile);
            if (Object.keys(errors).length) {
                return {errors};
            }
            return userService.saveProfile(db, userId, profile);
        });
});

router.route("/users").get(async (req, res) => {
    if (!req.body) throw Error("profile was not submitted");
    await apiHelper.sendDbConnectedPromise(res,
        async (db) => {
            const search = req.query.q;
            const location = req.query.l;
            if (!search || !location) {
                throw Error("Parameters q and l are expected");
            }
            return userService.searchDevelopers(db, search, location);
        });
});

router.route("/users/:user_name").get(async (req, res) => {
    if (!req.body) throw Error("profile was not submitted");
    await apiHelper.sendDbConnectedPromise(res,
        async (db) => {
            const userName = req.params.user_name;
            const user = await db.user.findOne({name: userName});
            if (!user) {
                throw Error(`Could not find user. User name: ${userName}`);
            }
            const currentUserId = apiHelper.getAndEnsureUserId(req);
            return userService.getUserProfileFromUser(db, user, currentUserId, commonTypes.Operation.VIEW);
        });
});

/**
 * Get user
 */
router.route("/users/:id").get(async (req, res) => {
    await apiHelper.sendDbConnectedPromise(res,
        async (db) => {
            apiHelper.getAndEnsureUserId(req);
            const entityId = req.params.id;
            const user = await db.user.findOne({id: entityId});
            if (user) {
                return user;
            }
            throw Error("could not find user");
        });
});

export default router;
