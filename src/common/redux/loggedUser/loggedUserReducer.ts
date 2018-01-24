import * as commonTypes from "../../typings";
import { LOGGED_USER_LOAD_ERROR, LOGGED_USER_LOAD_STARTED, LOGGED_USER_LOAD_SUCCESS, } from "./loggedUserActions";

const defaultLoggedUserState: commonTypes.CurrentUserProfile = {
    id: undefined,
    name: undefined,
    displayName: undefined,
    photoUrl: undefined,
    activated: false,
};

export function loggedUserReducer(state = defaultLoggedUserState, {payload, type}: { payload: commonTypes.CurrentUserProfile, type: string }) {
    switch (type) {
        case LOGGED_USER_LOAD_STARTED:
            return state;
        case LOGGED_USER_LOAD_SUCCESS:
            return payload;
        case LOGGED_USER_LOAD_ERROR:
            // todo: Add error treatment
            return state;
        default:
            return state;
    }
}
