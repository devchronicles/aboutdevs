import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import searchReducer from './search/searchReducer';
import loggedUserReducer from './loggedUser/loggedUserReducer';

export default combineReducers({
    form: reduxFormReducer,
    search: searchReducer,
    loggedUser: loggedUserReducer
});
