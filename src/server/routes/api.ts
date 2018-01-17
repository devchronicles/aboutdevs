import * as express from "express";
import * as apiHelper from "../helpers/apiHelper";
import * as tagService from "../services/tagService";
import * as googlePlacesService from "../services/locationService";
import * as userService from "../services/userService";
import * as dbTypes from "../typings/dbTypes";

const router = express.Router();

// PUBLIC
// Used by the SelectLocation component
router.route("/l").get(async (req: express.Request, res: express.Response) => {
    const location = req.query.q;
    if (!location) {
        apiHelper.sendOk(res, []);
        return;
    }
    await apiHelper.sendDbConnectedPromise(res,
        (db: dbTypes.AboutDevsDatabase) => googlePlacesService.searchLocationsFormatted(db, req.query.q as string));
});

// PUBLIC
router.route("/t").get(async (req, res) => {
    const tag = req.query.q;
    if (!tag) {
        apiHelper.sendOk(res, []);
        return;
    }
    await apiHelper.sendDbConnectedPromise(res,
        async (db: dbTypes.AboutDevsDatabase) => {
            return tagService.searchTagsFormatted(db, req.query.q as string);
        });
});

router.route("/u/check_name").get(async (req, res) => {
    const userId = apiHelper.getUserId(req);
    if (!userId) {
        apiHelper.sendNoUserLoggedInError(res);
        return;
    }
    const userName = req.query.q;
    if (!userName) {
        apiHelper.sendOk(res, {exists: true});
        return;
    }
    await apiHelper.sendDbConnectedPromise(res,
        async (db) => {
            const nameExistsResult = (await db._aboutdevs_is_user_name_taken(userName, userId))[0];
            return nameExistsResult.exists;
        });
});

router.route("/u/edit_my_profile").get(async (req, res) => {
    const userId = apiHelper.getUserId(req);
    if (!userId) {
        apiHelper.sendNoUserLoggedInError(res);
        return;
    }
    await apiHelper.sendDbConnectedPromise(res,
        async (db) => {
            const user = await db.user.findOne({id: userId});
            return userService.getUserProfile(db, user);
        });
});

router.route("/u/edit_my_profile").post(async (req, res) => {
    const userId = apiHelper.getUserId(req);
    if (!userId) {
        apiHelper.sendNoUserLoggedInError(res);
        return;
    }
    await apiHelper.sendDbConnectedPromise(res,
        async (db) => {
            if (!req.body) throw Error("profile was not submitted");
            const profile = req.body;
            const errors = await userService.validateProfile(db, profile);
            if (Object.keys(errors).length) {
                return {errors};
            }
            return userService.saveProfile(db, userId, profile);
        });
});

// PUBLIC
router.route("/u/:user_name").get(async (req, res) => {
    const userName = req.params.user_name;
    if (!userName) {
        apiHelper.sendError(res, "User name should not be empty");
        return;
    }
    await apiHelper.sendDbConnectedPromise(res,
        async (db) => {
            const currentUserId = apiHelper.getUserId(req);
            const user = await userService.getUserByName(db, userName, currentUserId);
            if (!user) {
                apiHelper.sendError(res, `Could not find user. User name: ${userName}`);
                return;
            }
            return userService.getUserProfile(db, user);
        });
});

router.route("/s/t/:tags/l/:googlePlaceId/:placeString").get(async (req, res) => {
    const tags = req.params.tags;
    const googlePlaceId = req.params.googlePlaceId;
    if (!tags || !googlePlaceId) {
        apiHelper.sendError(res, "Both the tags and the google place id must be specified");
        return;
    }
    await apiHelper.sendDbConnectedPromise(res,
        async (db) => {
            const page = parseInt(req.query.page || "1", 10) || 1;
            return userService.searchDevelopers(db, tags, googlePlaceId, page);
        });
});

export default router;
