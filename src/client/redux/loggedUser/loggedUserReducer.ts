import * as commonTypes from '../../../common/typings';

const defaultLoggedUserState: commonTypes.IReduxCurrentUserProfile = {
    id: undefined,
    name: undefined,
    displayName: undefined,
    photoUrl: undefined,
    gender: undefined
};

function searchReducer(state = defaultLoggedUserState) {
    return state;
}

export default searchReducer;
