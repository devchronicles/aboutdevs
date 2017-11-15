import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { loggedUserReducer } from './loggedUser/loggedUserReducer';
import { notificationsReducer } from './notifications/notificationsReducer';
import { searchReducer } from './search/searchReducer';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
    form: reduxFormReducer,
    loggedUser: loggedUserReducer,
    notifications: notificationsReducer,
    search: searchReducer,
    router: routerReducer,
});
