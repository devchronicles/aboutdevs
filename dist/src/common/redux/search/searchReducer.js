"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const searchActions = require("./searchActions");
const defaultSearchState = {
    profiles: [],
    loading: false,
};
function searchReducer(state = defaultSearchState, { payload, type }) {
    let searchState;
    switch (type) {
        case searchActions.SEARCH_LOAD_STARTED:
            searchState = Object.assign({}, state);
            searchState.loading = false;
            return searchState;
        case searchActions.SEARCH_LOAD_SUCCESS:
            searchState = Object.assign({}, state);
            searchState.profiles = payload;
            return searchState;
        default:
            return state;
    }
}
exports.searchReducer = searchReducer;
//# sourceMappingURL=searchReducer.js.map