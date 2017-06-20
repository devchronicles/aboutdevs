import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';

const router = express.Router();

/**
 * Function  that actually sends the application to the client
 * @param response
 */
function sendApp(res: express.Response, preloadedState: object) {
    fs.readFile(path.join(__dirname, './index.html'), 'utf8', (error, data) => {
        const result = data.replace(/\$\{css\}/g, '').replace(/\$\{js\}/g, 'http://localhost:8080/bundle.js');
        res.status(200).send(result);
    });


    /*eslint-disable*/
    const wrap = require('../../client/index.html')
        .replace(/\$\{css\}/g, '')
        .replace(/\$\{js\}/g, 'http://localhost:8080/bundle.js')
        .replace(/\$\{preloadedState\}/g, JSON.stringify(preloadedState).replace(/</g, '\\u003c'))
    /*eslint-enable*/
    res.status(200).send(wrap);
}

/**
 * Wild-card route
 */
router.route('*').get((req, res) => {
    sendApp(res, {
        loggedUser: req.user
    });
});

export default router;
