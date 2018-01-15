"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gravatar = require("gravatar");
var GravatarSize;
(function (GravatarSize) {
    GravatarSize["small"] = "200";
    GravatarSize["medium"] = "400";
    GravatarSize["big"] = "800";
})(GravatarSize = exports.GravatarSize || (exports.GravatarSize = {}));
function getGravatarImageFromEmail(email, size) {
    return gravatar.url(email, { s: size, d: "retro" });
}
exports.getGravatarImageFromEmail = getGravatarImageFromEmail;
//# sourceMappingURL=gravatarHelper.js.map