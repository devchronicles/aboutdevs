"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const buildDb_1 = require("../db/buildDb");
function getAndEnsureUserId(req) {
    if (!req)
        throw Error("Argument 'req' should be truthy");
    let userId = req.user ? req.user.id : null;
    if (userId === null && process.env.NODE_ENV !== "production") {
        userId = req.header("user-id");
    }
    if (!userId)
        throw Error("No user is logged in");
    return userId;
}
exports.getAndEnsureUserId = getAndEnsureUserId;
/**
 * Returns a function that catches an exception in Promises
 * @param {*} res The Express res object
 */
function apiExceptionCatcher(res) {
    if (!res)
        throw Error("Argument 'res' should be truthy");
    return (ex) => res.status(500).send({ error: ex.message });
}
exports.apiExceptionCatcher = apiExceptionCatcher;
/**
 * Sends an error to the client
 * @param {*} res The express res object
 * @param {*} error Either an error string or an Error object
 */
function sendError(res, error, status = 500) {
    if (!res)
        throw Error("Argument 'res' should be truthy");
    if (!error)
        throw Error("Argument 'error' should be truthy");
    const resultError = error instanceof Error ? error.message : error;
    const finalError = process.env.NODE_ENV !== "production" ? resultError : "Something went wrong in the server";
    return res.status(status).send({ error: finalError });
}
exports.sendError = sendError;
/**
 * @param {*} res The express res object
 * @param {*} error Either an error string or an Error object
 */
function sendClientError(res, error) {
    if (!res)
        throw Error("Argument 'res' should be truthy");
    if (!error)
        throw Error("Argument 'error' should be truthy");
    return sendError(res, error, 400);
}
exports.sendClientError = sendClientError;
/**
 * Sends an object to the client
 * @param {*} res The express res Object
 * @param {*} data The data to be sent to the client
 */
function sendOk(res, data) {
    if (!res)
        throw Error("Argument 'res' should be truthy");
    return res.status(200).send(data);
}
exports.sendOk = sendOk;
function sendPromise(res, promise) {
    if (!res)
        throw Error("Argument 'res' should be truthy");
    return promise
        .then((result) => {
        if (result.error)
            return sendClientError(res, result.error);
        return sendOk(res, result);
    })
        .catch((e) => sendError(res, e));
}
exports.sendPromise = sendPromise;
function sendDbConnectedPromise(res, promiseFunction) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!res)
            throw Error("Argument 'res' should be truthy");
        if (!promiseFunction)
            throw Error("Argument 'promiseFunction' should be truthy");
        const db = yield buildDb_1.default();
        try {
            const promiseResult = yield promiseFunction(db);
            sendOk(res, promiseResult);
        }
        catch (ex) {
            if (process.env.NODE_ENV !== "production") {
                /* tslint:disable */
                console.log(ex);
                /* tslint:enable */
            }
            sendError(res, ex);
        }
    });
}
exports.sendDbConnectedPromise = sendDbConnectedPromise;
//# sourceMappingURL=apiHelper.js.map