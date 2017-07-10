import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { loggedUserReducer } from './loggedUser/loggedUserReducer';
import { notificationsReducer } from './notifications/notificationsReducer';

export default combineReducers({
    form: reduxFormReducer,
    loggedUser: loggedUserReducer,
    notifications: notificationsReducer,
});
