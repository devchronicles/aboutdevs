import * as commonTypes from '../../../common/typings';

import * as searchActions from './searchActions';

const defaultSearchState: commonTypes.SearchState = {
    criteria: {
        search: null,
        location: null,
        loading: false,
    },
    result: null,
};

export function searchReducer(state = defaultSearchState, { payload, type }: { payload: any, type: string }) {
    let result;
    switch (type) {
        case searchActions.SEARCH_CRITERIA_LOAD_STARTED:
            result = { ...state };
            result.criteria.loading = true;
            return result;
        case searchActions.SEARCH_CRITERIA_LOAD_ERROR:
        case searchActions.SEARCH_CRITERIA_LOAD_SUCCESS:
            result = { ...state };
            result.criteria.search = payload.search;
            result.criteria.location = payload.location;
            result.criteria.loading = false;
            return result;
        default:
            return state;
    }
}
