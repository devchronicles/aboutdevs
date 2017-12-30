import { combineReducers } from "redux";
import { reducer as reduxFormReducer } from "redux-form";
import { loggedUserReducer } from "./loggedUser/loggedUserReducer";
import { notificationsReducer } from "./notifications/notificationsReducer";
import { searchReducer } from "./search/searchReducer";
import { profileReducer } from "./profileEdit/profileReducer";

export default combineReducers({
    form: reduxFormReducer,
    loggedUser: loggedUserReducer,
    notifications: notificationsReducer,
    search: searchReducer,
    profile: profileReducer,
});
