import { PROFILE_EDIT_LOAD_STARTED, PROFILE_EDIT_LOAD_SUCCESS, PROFILE_EDIT_LOAD_ERROR } from './profileEditActions';

const defaultProfileEditState = {
    id: undefined,
    name: undefined,
    displayName: undefined,
    photoUrl: undefined,
    loadState: undefined
};

function searchReducer(state = defaultProfileEditState, { payload, type }) {
    let result;
    switch (type) {
        case PROFILE_EDIT_LOAD_STARTED:
            result = Object.assign({}, state);
            result.loadState = 'loading';
            return result;
        case PROFILE_EDIT_LOAD_SUCCESS:
            result = Object.assign({}, state, payload);
            result.loadState = 'loaded';
            return result;
        case PROFILE_EDIT_LOAD_ERROR:
            result = Object.assign({}, state);
            result.loadState = 'error';
            return result;
        default:
            return state;
    }
}

export default searchReducer;
