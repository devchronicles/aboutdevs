"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const passport = require("passport");
const buildDb_1 = require("../db/buildDb");
const urlHelper_1 = require("../helpers/urlHelper");
const router = express.Router();
router.route("/google").get(passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email"],
}));
router.route("/google/callback").get(passport.authenticate("google", {
    failureRedirect: "/error",
}), (req, res) => {
    // this is a hack, I'm storing this value just so I can obtain it back
    // in my own connect-middleware on every request
    req.session.userId = req.user;
    res.redirect("/auth/verifyuserprofile");
});
router.route("/linkedin").get(passport.authenticate("linkedin", {}));
router.route("/linkedin/callback").get(passport.authenticate("linkedin", {
    failureRedirect: "/error",
}), (req, res) => {
    // this is a hack, I'm storing this value just so I can obtain it back
    // in my own connect-middleware on every request
    req.session.userId = req.user;
    res.redirect("/auth/verifyuserprofile");
});
/**
 * Called after a successful authentication.
 */
router.route("/verifyuserprofile").get((req, res) => {
    const user = req.user ? req.user : null;
    if (!user || !user.id) {
        urlHelper_1.redirectToHome(res);
    }
    else {
        buildDb_1.default()
            .then((db) => db.user.findOne({ id: user.id })
            .then((u) => {
            if (u) {
                if (u.status === 0) {
                    // the user needs to update their profile
                    urlHelper_1.redirectToProfileEdit(res);
                }
                else {
                    urlHelper_1.redirectToHome(res);
                }
            }
            else {
                // todo: Log error here
                urlHelper_1.redirectToHome(res);
            }
        }));
    }
});
router.get("/logout", (req, res) => {
    req.logout();
    urlHelper_1.redirectToHome(res);
});
exports.default = router;
//# sourceMappingURL=auth.js.map