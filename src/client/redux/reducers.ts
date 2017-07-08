import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import loggedUserReducer from './loggedUser/loggedUserReducer';

export default combineReducers({
    form: reduxFormReducer,
    loggedUser: loggedUserReducer,
});
