import * as ReactRedux from "react-redux";
import * as httpClient from "../../httpClient";
import * as commonTypes from "../../typings";

export const SEARCH_LOAD_STARTED = "SEARCH_LOAD_STARTED";
export const SEARCH_LOAD_SUCCESS = "SEARCH_LOAD_SUCCESS";
export const SEARCH_LOAD_ERROR = "SEARCH_LOAD_ERROR";

/**
 * Loads the criteria of the search
 * @param {string} tags
 * @param {string} formattedAddress
 * @returns {(dispatch: Dispatch<ReduxState>) => Promise<any>}
 */
export const searchLoad = (tags: string[], formattedAddress: string) => {
    return async (dispatch: ReactRedux.Dispatch<commonTypes.ReduxState>) => {
        dispatch({type: SEARCH_LOAD_STARTED});
        try {
            const searchResult = await httpClient.searchDevelopers(tags, formattedAddress);
            dispatch({type: SEARCH_LOAD_SUCCESS, payload: searchResult.data});
        } catch (ex) {
            dispatch({type: SEARCH_LOAD_SUCCESS, payload: []});
        }
    };
};
