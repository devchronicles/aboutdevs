export const LOGGED_USER_LOAD_STARTED = "LOGGED_USER_LOAD_STARTED";
export const LOGGED_USER_LOAD_SUCCESS = "LOGGED_USER_LOAD_SUCCESS";
export const LOGGED_USER_LOAD_ERROR = "LOGGED_USER_LOAD_ERROR";

import * as clientTypes from "../../typings";
import * as ReactRedux from "react-redux";
import { getLoggedUserData } from "../../httpClient";

export const reloadLoggedUser = () => {
    return async (dispatch: ReactRedux.Dispatch<clientTypes.ReduxState>) => {
        dispatch({type: LOGGED_USER_LOAD_STARTED});
        const response = await getLoggedUserData();
        switch (response.status) {
            case 500:
                dispatch({type: LOGGED_USER_LOAD_ERROR});
                break;
            case 200:
                dispatch({type: LOGGED_USER_LOAD_SUCCESS, payload: response.data});
                break;
            default:
                throw Error(`reloadLoggedUser error. Unexpected status code. Status code: ${response.status}`);
        }
    };
};