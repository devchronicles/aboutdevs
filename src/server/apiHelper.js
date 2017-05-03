/**
 * Returns a function that catches an exception in Promises
 * @param {*} res The Express res object
 */
export function apiExceptionCatcher(res) {
    return ex => res.status(500).send({ error: ex.message });
}

/**
 * Sends an error to the client
 * @param {*} res The express res object
 * @param {*} error Either an error string or an Error object
 */
export function sendError(res, error) {
    const resultError = error instanceof Error ? error.message : error;
    res.status(500).send({ error: resultError });
}

/**
 * Sends an object to the client
 * @param {*} res The express res Object
 * @param {*} data The data to be sent to the client
 */
export function sendOk(res, data) {
    res.status(200).send(data);
}
