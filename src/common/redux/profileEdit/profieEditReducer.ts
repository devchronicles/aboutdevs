import * as commonTypes from '../../../common/typings';

import { PROFILE_EDIT_LOAD_ERROR, PROFILE_EDIT_LOAD_STARTED, PROFILE_EDIT_LOAD_SUCCESS } from './profileEditActions';

const defaultProfileEditState: commonTypes.UserProfile = {
    id: undefined,
    name: undefined,
    displayName: undefined,
    photoUrl: undefined,
    loadState: undefined,
    profession: undefined,
    bio: undefined,
    activities: undefined,
    type: commonTypes.UserProfileType.USER,
    address: undefined,
};

export function profileEditReducer(state = defaultProfileEditState, { payload, type }: { payload: commonTypes.UserProfile, type: string }) {
    let result;
    switch (type) {
        case PROFILE_EDIT_LOAD_STARTED:
            result = { ...state };
            result.loadState = commonTypes.UserProfileLoadState.LOADING;
            return result;
        case PROFILE_EDIT_LOAD_SUCCESS:
            result = { ...state, ...payload };
            result.loadState = commonTypes.UserProfileLoadState.LOADED;
            return result;
        case PROFILE_EDIT_LOAD_ERROR:
            result = { ...state };
            result.loadState = commonTypes.UserProfileLoadState.ERROR;
            return result;
        default:
            return state;
    }
}
