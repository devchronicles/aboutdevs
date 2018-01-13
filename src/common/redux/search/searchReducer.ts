import * as commonTypes from "../../../common/typings";
import * as searchActions from "./searchActions";

const defaultSearchState: commonTypes.SearchState = {
    criteria: {
        search: null,
        location: null,
        loading: false,
    },
    result: {
        profiles: [],
        loading: false,
    },
};

export function searchReducer(state = defaultSearchState, {payload, type}: { payload: any, type: string }) {
    let searchState;
    switch (type) {
        case searchActions.SEARCH_LOAD_STARTED:
            searchState = {...state};
            searchState.result.loading = false;
            return searchState;
        case searchActions.SEARCH_LOAD_SUCCESS:
            searchState = {...state};
            searchState.result.profiles = payload;
            return searchState;
        default:
            return state;
    }
}
