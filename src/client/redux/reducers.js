import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { Record } from 'immutable';

import { SEARCH_START, SEARCH_ENDED } from './actions';

export const SearchState = new Record({
    cityId: -1,
    expression: ''
});

function counterReducer(state = new SearchState(), { payload, type }) {
    return state;
}

export default combineReducers({
    routing: routerReducer,
    count: counterReducer
});
