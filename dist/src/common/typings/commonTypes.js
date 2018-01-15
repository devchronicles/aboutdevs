"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserProfileType;
(function (UserProfileType) {
    UserProfileType[UserProfileType["DEVELOPER"] = 0] = "DEVELOPER";
    UserProfileType[UserProfileType["RECRUITER"] = 1] = "RECRUITER";
})(UserProfileType = exports.UserProfileType || (exports.UserProfileType = {}));
var LoadState;
(function (LoadState) {
    LoadState[LoadState["NOT_INITIATED"] = 0] = "NOT_INITIATED";
    LoadState[LoadState["LOADED"] = 1] = "LOADED";
    LoadState[LoadState["LOADING"] = 2] = "LOADING";
    LoadState[LoadState["ERROR"] = 3] = "ERROR";
})(LoadState = exports.LoadState || (exports.LoadState = {}));
var UserProfileStatus;
(function (UserProfileStatus) {
    UserProfileStatus[UserProfileStatus["PENDING_PROFILE_ACTIVATION"] = 0] = "PENDING_PROFILE_ACTIVATION";
    UserProfileStatus[UserProfileStatus["READY"] = 1] = "READY";
})(UserProfileStatus = exports.UserProfileStatus || (exports.UserProfileStatus = {}));
//# sourceMappingURL=commonTypes.js.map