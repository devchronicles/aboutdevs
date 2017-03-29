import express from 'express';
import fs from 'fs';

require.extensions['.html'] = function loadHtml(module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

const router = express.Router();

/**
 * Function  that actually sends the application to the client
 * @param response
 */
function sendApp(res, preloadedState) {
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
        loggedUser: {
            name: 'andre'
        }
    });
});

export default router;
