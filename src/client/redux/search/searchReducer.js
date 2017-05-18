import { CHANGE_SEARCH_CRITERIA } from './searchActions';

const defaultSearchState = {
    professional: '',
    location: ''
};

function searchReducer(state = defaultSearchState, { payload, type }) {
    switch (type) {
        case CHANGE_SEARCH_CRITERIA:
            return Object.assign({}, state, payload);
        default:
            return state;
    }
}

export default searchReducer;
