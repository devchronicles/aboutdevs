import * as express from "express";
import * as fs from "fs";

const router = express.Router();

/**
 * Function  that actually sends the application to the client
 * @param response
 */
function sendApp(res: express.Response, preloadedHtml: string, preloadedState: object) {
    fs.readFile("src/common/index.html", "utf8", (error, data) => {
        let result = data;
        result = result.replace(/\$\{css\}/g, "");
        result = result.replace(/\$\{js\}/g, "http://localhost:8080/bundle.js");
        result = result.replace(/\$\{preloadedState\}/g, JSON.stringify(preloadedState).replace(/</g, "\\u003c"));
        result = result.replace(/\$\{html\}/g, preloadedHtml || "");
        res.status(200).send(result);
    });
}

router.route("/s/:location/:profession").get((req, res) => {
    sendApp(res, null, {
        loggedUser: req.user,
    });
});

/**
 * Wild-card route
 */
router.route("*").get((req, res) => {
    sendApp(res, null, {
        loggedUser: req.user,
    });
});

export default router;
