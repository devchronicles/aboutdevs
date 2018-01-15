"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const apiHelper = require("../helpers/apiHelper");
const tagService = require("../services/tagService");
const googlePlacesService = require("../services/googlePlacesService");
const userService = require("../services/userService");
const router = express.Router();
router.route("/addresses").get((req, res) => __awaiter(this, void 0, void 0, function* () {
    yield apiHelper.sendDbConnectedPromise(res, (db) => googlePlacesService.searchCitiesFormatted(db, req.query.q));
}));
router.route("/tags").get((req, res) => __awaiter(this, void 0, void 0, function* () {
    yield apiHelper.sendDbConnectedPromise(res, (db) => __awaiter(this, void 0, void 0, function* () {
        return tagService.searchTagsFormatted(db, req.query.q);
    }));
}));
router.route("/users/check_name").get((req, res) => __awaiter(this, void 0, void 0, function* () {
    yield apiHelper.sendDbConnectedPromise(res, (db) => __awaiter(this, void 0, void 0, function* () {
        const userId = apiHelper.getAndEnsureUserId(req);
        const userName = req.query.q;
        const nameExistsResult = (yield db._aboutdevs_is_user_name_taken(userName, userId))[0];
        return nameExistsResult.exists;
    }));
}));
router.route("/users/edit_my_profile").get((req, res) => __awaiter(this, void 0, void 0, function* () {
    yield apiHelper.sendDbConnectedPromise(res, (db) => __awaiter(this, void 0, void 0, function* () {
        const userId = apiHelper.getAndEnsureUserId(req);
        const user = yield db.user.findOne({ id: userId });
        return userService.getUserProfile(db, user);
    }));
}));
router.route("/users/edit_my_profile").post((req, res) => __awaiter(this, void 0, void 0, function* () {
    yield apiHelper.sendDbConnectedPromise(res, (db) => __awaiter(this, void 0, void 0, function* () {
        if (!req.body)
            throw Error("profile was not submitted");
        const profile = req.body;
        const userId = apiHelper.getAndEnsureUserId(req);
        const errors = yield userService.validateProfile(db, profile);
        if (Object.keys(errors).length) {
            return { errors };
        }
        return userService.saveProfile(db, userId, profile);
    }));
}));
router.route("/users/:user_name").get((req, res) => __awaiter(this, void 0, void 0, function* () {
    if (!req.body)
        throw Error("profile was not submitted");
    yield apiHelper.sendDbConnectedPromise(res, (db) => __awaiter(this, void 0, void 0, function* () {
        const userName = req.params.user_name;
        const user = yield db.user.findOne({ name: userName });
        if (!user) {
            throw Error(`Could not find user. User name: ${userName}`);
        }
        return userService.getUserProfile(db, user);
    }));
}));
/**
 * Get user
 */
router.route("/users/:id").get((req, res) => __awaiter(this, void 0, void 0, function* () {
    yield apiHelper.sendDbConnectedPromise(res, (db) => __awaiter(this, void 0, void 0, function* () {
        apiHelper.getAndEnsureUserId(req);
        const entityId = req.params.id;
        const user = yield db.user.findOne({ id: entityId });
        if (user) {
            return user;
        }
        throw Error("could not find user");
    }));
}));
router.route("/s/t/:tags/l/:googlePlaceId/:placeString").get((req, res) => __awaiter(this, void 0, void 0, function* () {
    yield apiHelper.sendDbConnectedPromise(res, (db) => __awaiter(this, void 0, void 0, function* () {
        const tags = req.params.tags;
        const googlePlaceId = req.params.googlePlaceId;
        const page = parseInt(req.query.page || "1", 10);
        return userService.searchDevelopers(db, tags, googlePlaceId, page);
    }));
}));
exports.default = router;
//# sourceMappingURL=api.js.map