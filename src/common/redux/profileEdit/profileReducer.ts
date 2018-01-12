import * as profileActions from "./profileActions";
import { LoadState, ProfileState, UserProfile } from "../../typings";

const defaultProfileState: ProfileState = {
    loadState: LoadState.NOT_INITIATED,
    data: null,
};

export function profileReducer(state = defaultProfileState, {payload, type}: { payload: UserProfile, type: string }) {
    let profileState;
    switch (type) {
        case profileActions.PROFILE_LOAD_STARTED:
            profileState = {...state};
            profileState.loadState = LoadState.LOADING;
            profileState.data = null;
            return profileState;
        case profileActions.PROFILE_LOAD_SUCCESS:
            profileState = {...state};
            profileState.loadState = LoadState.LOADED;
            profileState.data = payload;
            return profileState;
        case profileActions.PROFILE_LOAD_ERROR:
            profileState = {...state};
            profileState.loadState = LoadState.ERROR;
            profileState.data = null;
            return profileState;
        default:
            return state;
    }
}
