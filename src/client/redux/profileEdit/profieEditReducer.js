import { CHANGE_SEARCH_CRITERIA } from './searchActions';

const defaultProfileEditState = {
    
};

function searchReducer(state = defaultProfileEditState, { payload, type }) {
    switch (type) {
        case CHANGE_SEARCH_CRITERIA:
            return Object.assign({}, state, payload);
        default:
            return state;
    }
}

export default searchReducer;
