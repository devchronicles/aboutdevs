"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function redirectToHome(res) {
    res.redirect("/");
}
exports.redirectToHome = redirectToHome;
function redirectToProfileEdit(res) {
    res.redirect("/config/edituserprofile");
}
exports.redirectToProfileEdit = redirectToProfileEdit;
//# sourceMappingURL=urlHelper.js.map