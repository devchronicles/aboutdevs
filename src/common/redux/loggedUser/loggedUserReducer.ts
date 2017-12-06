import * as commonTypes from "../../typings";

const defaultLoggedUserState: commonTypes.CurrentUserProfile = {
    id: undefined,
    name: undefined,
    displayName: undefined,
    photoUrl: undefined,
};

export function loggedUserReducer(state = defaultLoggedUserState) {
    return state;
}
