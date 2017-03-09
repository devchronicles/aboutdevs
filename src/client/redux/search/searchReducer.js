import DefaultState from '../defaultState';
import { SEARCH_CHANGE } from './searchActions';

function searchReducer(state = new DefaultState(), { payload, type }) {
    switch (type) {
        case SEARCH_CHANGE:
            return payload;
        default:
            return state;
    }
}

export default searchReducer;
