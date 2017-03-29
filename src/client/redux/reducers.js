import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import searchReducer from './search/searchReducer';
import loggedUserReducer from './loggedUser/loggedUserReducer';

export default combineReducers({
    routing: routerReducer,
    search: searchReducer,
    loggedUser: loggedUserReducer
});
