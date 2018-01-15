"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notificationsActions_1 = require("./notificationsActions");
const defaultNotificationsState = [];
function notificationsReducer(state = defaultNotificationsState, action) {
    switch (action.type) {
        case notificationsActions_1.ENQUEUE_NOTIFICATION:
            return [...state, action.payload];
        default:
            return state.slice(1);
    }
}
exports.notificationsReducer = notificationsReducer;
//# sourceMappingURL=notificationsReducer.js.map