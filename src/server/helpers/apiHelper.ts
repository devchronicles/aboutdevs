import * as express from "express";
import buildDb from "../db/buildDb";
import * as dbTypes from "../typings/dbTypes";

export function getAndEnsureUserId(req: express.Request): number {
    if (!req) throw Error("Argument 'req' should be truthy");

    let userId = req.user ? req.user.id : null;
    if (userId === null && process.env.NODE_ENV !== "production") {
        userId = req.header("user-id");
    }
    if (!userId) throw Error("No user is logged in");
    return userId;
}

/**
 * Returns a function that catches an exception in Promises
 * @param {*} res The Express res object
 */
export function apiExceptionCatcher(res: express.Response): (ex: Error) => any {
    if (!res) throw Error("Argument 'res' should be truthy");

    return (ex: Error) => res.status(500).send({error: ex.message});
}

/**
 * Sends an error to the client
 * @param {*} res The express res object
 * @param {*} error Either an error string or an Error object
 */
export function sendError(res: express.Response, error: Error | string, status = 500): express.Response {
    if (!res) throw Error("Argument 'res' should be truthy");
    if (!error) throw Error("Argument 'error' should be truthy");

    const resultError = error instanceof Error ? error.message : error;
    const finalError = process.env.NODE_ENV !== "production" ? resultError : "Something went wrong in the server";
    return res.status(status).send({error: finalError});
}

/**
 * @param {*} res The express res object
 * @param {*} error Either an error string or an Error object
 */
export function sendClientError(res: express.Response, error: Error | string): express.Response {
    if (!res) throw Error("Argument 'res' should be truthy");
    if (!error) throw Error("Argument 'error' should be truthy");

    return sendError(res, error, 400);
}

/**
 * Sends an object to the client
 * @param {*} res The express res Object
 * @param {*} data The data to be sent to the client
 */
export function sendOk(res: express.Response, data: any): express.Response {
    if (!res) throw Error("Argument 'res' should be truthy");

    return res.status(200).send(data);
}

export function sendPromise(res: express.Response, promise: Promise<any>): Promise<express.Response> {
    if (!res) throw Error("Argument 'res' should be truthy");

    return promise
        .then((result) => {
            if (result.error) return sendClientError(res, result.error);
            return sendOk(res, result);
        })
        .catch((e) => sendError(res, e));
}

export async function sendDbConnectedPromise(res: express.Response, promiseFunction: (db: dbTypes.AboutDevsDatabase) => any): Promise<void> {
    if (!res) throw Error("Argument 'res' should be truthy");
    if (!promiseFunction) throw Error("Argument 'promiseFunction' should be truthy");

    const db = await buildDb();
    try {
        const promiseResult = await promiseFunction(db);
        sendOk(res, promiseResult);
    } catch (ex) {
        if (process.env.NODE_ENV !== "production") {
            /* tslint:disable */
            console.log(ex);
            /* tslint:enable */
        }
        sendError(res, ex);
    }
}
