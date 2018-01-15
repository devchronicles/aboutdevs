"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpClient = require("../../httpClient");
exports.SEARCH_LOAD_STARTED = "SEARCH_LOAD_STARTED";
exports.SEARCH_LOAD_SUCCESS = "SEARCH_LOAD_SUCCESS";
exports.SEARCH_LOAD_ERROR = "SEARCH_LOAD_ERROR";
/**
 * Loads the criteria of the search
 * @param {string} tags
 * @param {string} formattedAddress
 * @returns {(dispatch: Dispatch<ReduxState>) => Promise<any>}
 */
exports.searchLoad = (tags, formattedAddress) => {
    if (!tags)
        throw Error("search should be truthy");
    if (!formattedAddress)
        throw Error("location should be truthy");
    return (dispatch) => __awaiter(this, void 0, void 0, function* () {
        dispatch({ type: exports.SEARCH_LOAD_STARTED });
        const searchResult = yield httpClient.searchDevelopers(tags, formattedAddress);
        dispatch({ type: exports.SEARCH_LOAD_SUCCESS, payload: searchResult.data });
    });
};
//# sourceMappingURL=searchActions.js.map