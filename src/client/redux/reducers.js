import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import searchReducer from './search/searchReducer';

export default combineReducers({
    routing: routerReducer,
    search: searchReducer
});
