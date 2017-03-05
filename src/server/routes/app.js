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
function sendApp(response) {
    /*eslint-disable*/
    const wrap = require('../../client/index.html')
        .replace(/\$\{css\}/g, '')
        .replace(/\$\{js\}/g, 'http://localhost:8080/bundle.js');
    /*eslint-enable*/
    response.status(200).send(wrap);
}

/**
 * Wild-card route
 */
router.route('*').get((req, res) => {
    sendApp(res);
});

export default router;
