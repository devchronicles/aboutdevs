import * as commonTypes from "../../../common/typings";

import * as searchActions from "./searchActions";

const defaultSearchState: commonTypes.SearchState = {
    criteria: {
        search: null,
        location: null,
        loading: false,
    },
    result: {
        display: commonTypes.SearchDisplay.ORDER_BY_DISTANCE,
        profiles: [],
        loading: false,
    },
};

export function searchReducer(state = defaultSearchState, { payload, type }: { payload: any, type: string }) {
    let searchState;
    switch (type) {
        case searchActions.SEARCH_CRITERIA_LOAD_STARTED:
            searchState = { ...state };
            searchState.criteria.loading = true;
            return searchState;
        case searchActions.SEARCH_CRITERIA_LOAD_ERROR:
        case searchActions.SEARCH_CRITERIA_LOAD_SUCCESS:
            searchState = { ...state };
            searchState.criteria.search = payload.search;
            searchState.criteria.location = payload.location;
            searchState.criteria.loading = false;
            return searchState;
        case searchActions.SEARCH_LOAD_STARTED:
            searchState = { ...state };
            searchState.result.loading = false;
        case searchActions.SEARCH_LOAD_SUCCESS:
            searchState = { ...state };
            searchState.result.profiles = payload;
        default:
            return state;
    }
}
