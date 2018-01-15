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
exports.ENQUEUE_NOTIFICATION = "ENQUEUE_NOTIFICATION";
exports.DEQUEUE_NOTIFICATION = "DEQUEUE_NOTIFICATION";
const defaultNotificatioObject = {
    position: "bl",
    level: "success",
};
/**
 * Enqueues a new notification to the state
 * @param notification Notification to enqueue
 */
function enqueueNotification(notification) {
    return (dispatch) => __awaiter(this, void 0, void 0, function* () {
        dispatch({ type: exports.ENQUEUE_NOTIFICATION, payload: Object.assign({}, defaultNotificatioObject, notification) });
    });
}
exports.enqueueNotification = enqueueNotification;
/**
 * Removes the first notification from the state
 */
function dequeueNotification() {
    return (dispatch) => __awaiter(this, void 0, void 0, function* () {
        dispatch({ type: exports.DEQUEUE_NOTIFICATION, payload: undefined });
    });
}
exports.dequeueNotification = dequeueNotification;
//# sourceMappingURL=notificationsActions.js.map