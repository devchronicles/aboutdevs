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
            return profileState;
        case profileActions.PROFILE_LOAD_SUCCESS:
            profileState = {...state};
            state.data = payload;
            profileState.loadState = LoadState.LOADED;
            return profileState;
        case profileActions.PROFILE_LOAD_ERROR:
            profileState = {...state};
            profileState.loadState = LoadState.ERROR;
            return profileState;
        default:
            return state;
    }
}
