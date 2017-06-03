import buildDb from '../db/buildDb';

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
    const finalError = process.env.NODE_ENV === 'development' ? resultError : 'Something went wrong in the server';
    res.status(500).send({ error: finalError });
}

/**
 * Sends an object to the client
 * @param {*} res The express res Object
 * @param {*} data The data to be sent to the client
 */
export function sendOk(res, data) {
    res.status(200).send(data);
}

export function sendPromise(res, promise) {
    promise
        .then(result => sendOk(res, result))
        .catch(e => sendError(res, e));
}

export function sendPromiseDb(res, promiseFunction) {
    buildDb()
        .then((db) => {
            promiseFunction(db)
                .then(result => sendOk(res, result))
                .catch(e => sendError(res, e));
        });
}

