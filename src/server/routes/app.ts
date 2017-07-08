import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';

const router = express.Router();

/**
 * Function  that actually sends the application to the client
 * @param response
 */
function sendApp(res: express.Response, preloadedState: object) {
    fs.readFile('src/client/index.html', 'utf8', (error, data) => {
        let result = data;
        result = result.replace(/\$\{css\}/g, '');
        result = result.replace(/\$\{js\}/g, 'http://localhost:8080/bundle.js');
        result = result.replace(/\$\{preloadedState\}/g, JSON.stringify(preloadedState).replace(/</g, '\\u003c'));
        res.status(200).send(result);
    });
}

/**
 * Wild-card route
 */
router.route('*').get((req, res) => {
    sendApp(res, {
        loggedUser: req.user,
    });
});

export default router;
