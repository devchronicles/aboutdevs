import buildDb from '../db/buildDb';

export function getAndEnsureUserId(req) {
    if (!req) throw Error('Argument \'req\' should be truthy');

    let userId = req.user ? req.user.id : null;
    if (userId === null && process.env.NODE_ENV !== 'production') {
        userId = req.header('user-id');
    }
    if (!userId) throw Error('No user is logged in');
    return userId;
}

/**
 * Returns a function that catches an exception in Promises
 * @param {*} res The Express res object
 */
export function apiExceptionCatcher(res) {
    if (!res) throw Error('Argument \'res\' should be truthy');

    return ex => res.status(500).send({ error: ex.message });
}

/**
 * Sends an error to the client
 * @param {*} res The express res object
 * @param {*} error Either an error string or an Error object
 */
export function sendError(res, error, status = 500) {
    if (!res) throw Error('Argument \'res\' should be truthy');
    if (!error) throw Error('Argument \'error\' should be truthy');

    const resultError = error instanceof Error ? error.message : error;
    const finalError = process.env.NODE_ENV !== 'production' ? resultError : 'Something went wrong in the server';
    res.status(status).send({ error: finalError });
}

/**
 * @param {*} res The express res object
 * @param {*} error Either an error string or an Error object
 */
export function sendClientError(res, error) {
    if (!res) throw Error('Argument \'res\' should be truthy');
    if (!error) throw Error('Argument \'error\' should be truthy');
    
    return sendError(res, error, 400);
}

/**
 * Sends an object to the client
 * @param {*} res The express res Object
 * @param {*} data The data to be sent to the client
 */
export function sendOk(res, data) {
    if (!res) throw Error('Argument \'res\' should be truthy');
    
    res.status(200).send(data);
}

export function sendPromise(res, promise) {
    if (!res) throw Error('Argument \'res\' should be truthy');
    
    promise
        .then((result) => {
            if (result.error) sendClientError(res, result.error);
            sendOk(res, result);
        })
        .catch(e => sendError(res, e));
}

export function sendPromiseDb(res, promiseFunction) {
    if (!res) throw Error('Argument \'res\' should be truthy');
    if (!promiseFunction) throw Error('Argument \'promiseFunction\' should be truthy');
    
    buildDb()
        .then(db => promiseFunction(db))
        .then(result => sendOk(res, result))
        .catch(e => sendError(res, e));
}

