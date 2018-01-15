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
const redux_form_1 = require("redux-form");
const httpClient_1 = require("../../httpClient");
exports.PROFILE_EDIT_LOAD_STARTED = "PROFILE_EDIT_LOAD_STARTED";
exports.PROFILE_EDIT_LOAD_SUCCESS = "PROFILE_EDIT_LOAD_SUCCESS";
exports.PROFILE_EDIT_LOAD_ERROR = "PROFILE_EDIT_LOAD_ERROR";
exports.PROFILE_LOAD_STARTED = "PROFILE_LOAD_STARTED";
exports.PROFILE_LOAD_SUCCESS = "PROFILE_LOAD_SUCCESS";
exports.PROFILE_LOAD_ERROR = "PROFILE_LOAD_ERROR";
/**
 * Changes the type of the search
 */
const defaultValues = {};
exports.profileEditLoadData = () => {
    return (dispatch) => __awaiter(this, void 0, void 0, function* () {
        dispatch({ type: exports.PROFILE_EDIT_LOAD_STARTED });
        const response = yield httpClient_1.getMyProfileData();
        switch (response.status) {
            case 500:
                dispatch({ type: exports.PROFILE_EDIT_LOAD_ERROR });
                break;
            case 200:
                dispatch({ type: exports.PROFILE_EDIT_LOAD_SUCCESS, payload: response.data });
                dispatch(redux_form_1.initialize("profileEdit", Object.assign({}, defaultValues, response.data)));
                break;
            default:
                throw Error(`profileEditLoadData error. Unexpected status code. Status code: ${response.status}`);
        }
    });
};
exports.profileViewLoadData = (userName) => {
    return (dispatch) => __awaiter(this, void 0, void 0, function* () {
        dispatch({ type: exports.PROFILE_LOAD_STARTED });
        const response = yield httpClient_1.getProfileData(userName);
        switch (response.status) {
            case 500:
                dispatch({ type: exports.PROFILE_LOAD_ERROR });
                break;
            case 200:
                dispatch({ type: exports.PROFILE_LOAD_SUCCESS, payload: response.data });
                break;
            default:
                throw Error(`profileViewLoadData error. Unexpected status code. Status code: ${response.status}`);
        }
    });
};
//# sourceMappingURL=profileActions.js.map