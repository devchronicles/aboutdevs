"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const redux_form_1 = require("redux-form");
const loggedUserReducer_1 = require("./loggedUser/loggedUserReducer");
const notificationsReducer_1 = require("./notifications/notificationsReducer");
const searchReducer_1 = require("./search/searchReducer");
const profileReducer_1 = require("./profileEdit/profileReducer");
exports.default = redux_1.combineReducers({
    form: redux_form_1.reducer,
    loggedUser: loggedUserReducer_1.loggedUserReducer,
    notifications: notificationsReducer_1.notificationsReducer,
    search: searchReducer_1.searchReducer,
    profile: profileReducer_1.profileReducer,
});
//# sourceMappingURL=reducers.js.map