import * as commonTypes from "../../typings";
import { ACTIVATE_LOGGED_USER } from "./loggedUserActions";

const defaultLoggedUserState: commonTypes.CurrentUserProfile = {
    id: undefined,
    name: undefined,
    displayName: undefined,
    photoUrl: undefined,
    activated: false,
};

export function loggedUserReducer(state = defaultLoggedUserState, {type}: { type: string }) {
    let newState: commonTypes.CurrentUserProfile;
    switch (type) {
        case ACTIVATE_LOGGED_USER:
            newState = {...state};
            newState.activated = true;
            return newState;
        default:
            return state;
    }
}
