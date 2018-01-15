"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const googlePlacesFormatHelper_1 = require("../helpers/googlePlacesFormatHelper");
exports.SearchProfileCard = ({ profile }) => {
    const { address } = googlePlacesFormatHelper_1.getDataFromFormattedAddress(profile.formattedAddress);
    const companyName = profile.companyName ? `at ${profile.companyName}` : "";
    return (React.createElement("li", { className: "profile-card" },
        React.createElement("a", { className: "card-body", href: `/${profile.name}` },
            React.createElement("div", { className: "image", style: { backgroundImage: `url(${profile.photoUrl})` } }),
            React.createElement("p", { className: "display-name" },
                " ",
                profile.displayName,
                " "),
            React.createElement("p", { className: "title" },
                " ",
                profile.title,
                " ",
                companyName),
            React.createElement("p", { className: "location" },
                React.createElement("i", { className: "fa fa-map-marker", "aria-hidden": "true" }),
                address))));
};
//# sourceMappingURL=SearchProfileCard.js.map