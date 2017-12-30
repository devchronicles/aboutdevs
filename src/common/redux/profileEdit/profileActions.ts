import * as ReactRedux from "react-redux";
import { initialize } from "redux-form";
import { getMyProfileData, getProfileData } from "../../httpClient";
import * as clientTypes from "../../typings";

export const PROFILE_EDIT_LOAD_STARTED = "PROFILE_EDIT_LOAD_STARTED";
export const PROFILE_EDIT_LOAD_SUCCESS = "PROFILE_EDIT_LOAD_SUCCESS";
export const PROFILE_EDIT_LOAD_ERROR = "PROFILE_EDIT_LOAD_ERROR";
export const PROFILE_LOAD_STARTED = "PROFILE_LOAD_STARTED";
export const PROFILE_LOAD_SUCCESS = "PROFILE_LOAD_SUCCESS";
export const PROFILE_LOAD_ERROR = "PROFILE_LOAD_ERROR";

/**
 * Changes the type of the search
 */

const defaultValues = {};

export const profileEditLoadData = () => {
    return async (dispatch: ReactRedux.Dispatch<clientTypes.ReduxState>) => {
        dispatch({type: PROFILE_EDIT_LOAD_STARTED});
        const response = await getMyProfileData();
        switch (response.status) {
            case 500:
                dispatch({type: PROFILE_EDIT_LOAD_ERROR});
                break;
            case 200:
                dispatch({type: PROFILE_EDIT_LOAD_SUCCESS, payload: response.data});
                dispatch(initialize("profileEdit", {...defaultValues, ...response.data}));
                break;
            default:
                throw Error(`profileEditLoadData error. Unexpected status code. Status code: ${response.status}`);
        }
    };
};

export const profileViewLoadData = (userName: string) => {
    return async (dispatch: ReactRedux.Dispatch<clientTypes.ReduxState>) => {
        dispatch({type: PROFILE_LOAD_STARTED});
        const response = await getProfileData(userName);
        switch (response.status) {
            case 500:
                dispatch({type: PROFILE_LOAD_ERROR});
                break;
            case 200:
                dispatch({type: PROFILE_LOAD_SUCCESS, payload: response.data});
                break;
            default:
                throw Error(`profileViewLoadData error. Unexpected status code. Status code: ${response.status}`);
        }
    };
};

