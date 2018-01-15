"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const SearchProfileCard_1 = require("./SearchProfileCard");
exports.ProfileList = ({ profiles }) => (React.createElement("div", { className: "profile-list" }, profiles && profiles.map((p, i) => React.createElement(SearchProfileCard_1.SearchProfileCard, { key: i, profile: p }))));
//# sourceMappingURL=ProfileList.js.map