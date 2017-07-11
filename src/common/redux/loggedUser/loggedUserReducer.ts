import * as commonTypes from '../../typings';

const defaultLoggedUserState: commonTypes.ReduxCurrentUserProfile = {
    id: undefined,
    name: undefined,
    displayName: undefined,
    photoUrl: undefined,
    gender: undefined,
};

export function loggedUserReducer(state = defaultLoggedUserState) {
    return state;
}
