"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const socialLinks_1 = require("../data/socialLinks");
const googlePlacesFormatHelper_1 = require("../helpers/googlePlacesFormatHelper");
const ProfileViewStyledComponents_1 = require("./ProfileViewStyledComponents");
const Markdown_1 = require("./Markdown");
class ProfileView extends React.Component {
    render() {
        const { profile } = this.props;
        if (!profile) {
            return null;
        }
        const { ProfileWrapper, 
        // Header
        HeaderWrapper, HeaderA, HeaderSpan, HeaderASocialLink, HeaderH1, 
        // Body
        BodyWrapper, BodyTag, } = ProfileViewStyledComponents_1.buildStyledComponents(profile.colors);
        let companyElement = null;
        let atElement = null;
        let inElement = null;
        if (profile.companyName) {
            atElement = React.createElement(HeaderSpan, null, " at ");
            companyElement = React.createElement(HeaderSpan, null, profile.companyName);
            if (profile.companyUrl) {
                companyElement = (React.createElement(HeaderA, { href: profile.companyUrl }, companyElement));
            }
        }
        if (profile.formattedAddress) {
            const { address } = googlePlacesFormatHelper_1.getDataFromFormattedAddress(profile.formattedAddress);
            inElement = React.createElement(HeaderSpan, null,
                " in ",
                address,
                " ");
        }
        return (React.createElement(ProfileWrapper, { className: "profile-view" },
            React.createElement(HeaderWrapper, { className: "header-wrapper" },
                React.createElement("header", null,
                    React.createElement("div", { className: "profile-image", style: { backgroundImage: `url(${profile.photoUrl})` } }),
                    React.createElement(HeaderH1, { className: "username" }, profile.displayName),
                    React.createElement("p", { className: "current-position" },
                        React.createElement(HeaderSpan, null, profile.title),
                        profile.companyName && atElement,
                        companyElement,
                        profile.formattedAddress && inElement),
                    React.createElement("div", { className: "social-button-wrapper" }, profile.socialLinks && profile.socialLinks.map((socialLinkValue, index) => {
                        if (!socialLinkValue || !socialLinkValue.url || !socialLinkValue.website)
                            return null;
                        const socialLink = socialLinks_1.socialLinks.find((sl) => sl.value === socialLinkValue.website);
                        const innerComponent = socialLink.iconClass
                            ? React.createElement("i", { className: socialLink.iconClass, "aria-hidden": "true" })
                            : null;
                        return (React.createElement(HeaderASocialLink, { key: `socialLink-${index}`, href: socialLinkValue.url, target: "_blank", className: "item" }, innerComponent));
                    })))),
            React.createElement(BodyWrapper, { className: "body-wrapper" },
                React.createElement("div", { className: "body" },
                    React.createElement("div", { className: "tag-wrapper" }, profile.tags && profile.tags.map((tag, index) => {
                        return (React.createElement(BodyTag, { key: `tag-${index}`, className: "tag" }, tag));
                    })),
                    React.createElement("div", { className: "bio-wrapper" },
                        React.createElement(Markdown_1.Markdown, { markdown: profile.bio ? profile.bio.text : "" }))))));
    }
}
exports.ProfileView = ProfileView;
//# sourceMappingURL=ProfileView.js.map