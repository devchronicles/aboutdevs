import * as profileActions from "./profileActions";

const defaultProfileState = {};

export function profileReducer(state = defaultProfileState, {payload, type}: { payload: any, type: string }) {
    let profileState;
    switch (type) {
        case profileActions.PROFILE_LOAD_STARTED:
            profileState = {...state};
            return profileState;
        case profileActions.PROFILE_LOAD_SUCCESS:
            profileState = {...state};
            return profileState;
        case profileActions.PROFILE_LOAD_ERROR:
            profileState = {...state};
            return profileState;
        default:
            return state;
    }
}
