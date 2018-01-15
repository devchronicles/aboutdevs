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
const React = require("react");
const express = require("express");
const fs = require("fs");
const typings_1 = require("../../common/typings");
const buildDb_1 = require("../db/buildDb");
const userService_1 = require("../services/userService");
const server_1 = require("react-dom/server");
const store_1 = require("../../common/redux/store");
const AppStatic_1 = require("../../common/AppStatic");
const router = express.Router();
// These are the first level paths (e.g, /something) that don't have SSR
const firstLevelNonSsrPaths = ["search"];
/**
 * Function  that actually sends the application to the client
 */
function sendApp(req, res, preloadedHtml = null, preloadedState = null) {
    const composedState = Object.assign({}, preloadedState, { loggedUser: req.user });
    fs.readFile("src/common/index.html", "utf8", (error, data) => {
        let result = data;
        let cssPath;
        let jsPath;
        const nodeEnv = process.env.NODE_ENV || "development";
        if (nodeEnv === "development") {
            cssPath = "";
            jsPath = "http://localhost:8080/bundle.js";
        }
        else {
            cssPath = "/static/bundle.css";
            jsPath = "/static/bundle.js";
        }
        result = result.replace(/\{css\}/g, () => cssPath);
        result = result.replace(/\{js\}/g, () => jsPath);
        result = result.replace(/\{preloadedState\}/g, () => JSON.stringify(composedState));
        result = result.replace(/\{html\}/g, () => preloadedHtml || "");
        res.status(200).send(result);
    });
}
for (const path of firstLevelNonSsrPaths) {
    router.route(`/${path}`).get((req, res) => sendApp(req, res));
}
router.route("/:userName").get((req, res) => __awaiter(this, void 0, void 0, function* () {
    const db = yield buildDb_1.default();
    const userName = req.params.userName;
    const user = yield db.user.findOne({ name: userName });
    const userProfile = yield userService_1.getUserProfile(db, user);
    const reduxState = {
        loggedUser: req.user,
        profile: {
            loadState: typings_1.LoadState.LOADED,
            data: userProfile,
        },
    };
    const store = store_1.configureStore(reduxState);
    const preloadedHtml = server_1.renderToString(React.createElement(AppStatic_1.AppStatic, { location: req.originalUrl, store: store }));
    sendApp(req, res, preloadedHtml, reduxState);
}));
/**
 * Wild-card route
 */
router.route("*").get((req, res) => sendApp(req, res));
exports.default = router;
//# sourceMappingURL=app.js.map