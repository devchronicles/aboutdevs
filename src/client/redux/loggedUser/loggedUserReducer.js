const defaultLoggedUserState = {
    id: undefined,
    displayName: undefined,
    photoUrl: undefined
};

function searchReducer(state = defaultLoggedUserState, { payload, type }) {
    return state;
}

export default searchReducer;
