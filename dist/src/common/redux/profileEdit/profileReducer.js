"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const profileActions = require("./profileActions");
const typings_1 = require("../../typings");
const defaultProfileState = {
    loadState: typings_1.LoadState.NOT_INITIATED,
    data: null,
};
function profileReducer(state = defaultProfileState, { payload, type }) {
    let profileState;
    switch (type) {
        case profileActions.PROFILE_LOAD_STARTED:
            profileState = Object.assign({}, state);
            profileState.loadState = typings_1.LoadState.LOADING;
            profileState.data = null;
            return profileState;
        case profileActions.PROFILE_LOAD_SUCCESS:
            profileState = Object.assign({}, state);
            profileState.loadState = typings_1.LoadState.LOADED;
            profileState.data = payload;
            return profileState;
        case profileActions.PROFILE_LOAD_ERROR:
            profileState = Object.assign({}, state);
            profileState.loadState = typings_1.LoadState.ERROR;
            profileState.data = null;
            return profileState;
        default:
            return state;
    }
}
exports.profileReducer = profileReducer;
//# sourceMappingURL=profileReducer.js.map