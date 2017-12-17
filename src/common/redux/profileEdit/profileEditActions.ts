import * as ReactRedux from "react-redux";
import { initialize } from "redux-form";
import { getProfileData } from "../../httpClient";
import * as clientTypes from "../../typings";

export const PROFILE_EDIT_LOAD_STARTED = "PROFILE_EDIT_LOAD_STARTED";
export const PROFILE_EDIT_LOAD_SUCCESS = "PROFILE_EDIT_LOAD_SUCCESS";
export const PROFILE_EDIT_LOAD_ERROR = "PROFILE_EDIT_LOAD_ERROR";

/**
 * Changes the type of the search
 */

const defaultValues = {
    colorPrimary: "#252934",
    colorSecondary: "#4A95DF",
    colorNegative: "#FFFFFF",
};

export const profileEditLoadData = () => {
    return async (dispatch: ReactRedux.Dispatch<clientTypes.ReduxState>) => {
        dispatch({type: PROFILE_EDIT_LOAD_STARTED});
        const response = await getProfileData();
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
