import * as ReactRedux from 'react-redux';
import * as httpClient from '../../httpClient';
import * as clientTypes from '../../typings';

export const SEARCH_CRITERIA_LOAD_STARTED = 'SEARCH_CRITERIA_LOAD_STARTED';
export const SEARCH_CRITERIA_LOAD_SUCCESS = 'SEARCH_CRITERIA_LOAD_SUCCESS';
export const SEARCH_CRITERIA_LOAD_ERROR = 'SEARCH_CRITERIA_LOAD_ERROR';


/**
 * Loads the criteria of the search
 * @param {string} search
 * @param {string} location
 * @returns {(dispatch: Dispatch<ReduxState>) => Promise<any>}
 */
export const searchCriteriaLoad = (search: string, location: string) => {
    if (!search) throw Error('search should be truthy');
    if (!location) throw Error('location should be truthy');

    return async (dispatch: ReactRedux.Dispatch<clientTypes.ReduxState>) => {
        dispatch({type: SEARCH_CRITERIA_LOAD_STARTED});
        const locations = await httpClient.searchLocations(location, true);
        const locationsData = locations.data
            ? locations.data as string[]
            : null;
        const firstMatchingLocation = locationsData
            ? locationsData[0]
            : null;

        if (firstMatchingLocation) {
            dispatch({type: SEARCH_CRITERIA_LOAD_SUCCESS, payload: { search, location: firstMatchingLocation }});
        } else {
            dispatch({type: SEARCH_CRITERIA_LOAD_ERROR, payload: { search, location }});
        }
    };
};
