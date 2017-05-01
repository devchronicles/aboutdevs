import { combineReducers } from 'redux';
import searchReducer from './search/searchReducer';
import loggedUserReducer from './loggedUser/loggedUserReducer';

export default combineReducers({
    search: searchReducer,
    loggedUser: loggedUserReducer
});
