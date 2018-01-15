"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const index_1 = require("./index");
const FaIcon_1 = require("../FaIcon");
const FormRow_1 = require("./FormRow");
const SelectSocialLink_1 = require("./SelectSocialLink");
const socialLinks_1 = require("../../data/socialLinks");
class SocialLinks extends React.Component {
    constructor() {
        super(...arguments);
        this.isLinkedIn = (index) => {
            const { fields } = this.props;
            return fields.get(index).website === socialLinks_1.LINKED_IN_SOCIAL_KEY;
        };
    }
    render() {
        const { fields, socialLinks } = this.props;
        return (React.createElement(index_1.FormGroup, null,
            React.createElement("div", { className: "field-array" },
                React.createElement("ul", null, fields.map((socialLink, index) => (React.createElement("li", { className: "multi-line", key: `social-link-${index}` },
                    React.createElement("div", { className: "item" },
                        React.createElement(FormRow_1.FormRow, null,
                            React.createElement(index_1.Field, { name: `${socialLink}.website`, label: "Website", component: index_1.FormField, innerComponent: SelectSocialLink_1.SelectSocialLink, innerComponentProps: {
                                    disabled: this.isLinkedIn(index),
                                    selectedSocialLinks: socialLinks,
                                    index,
                                }, addOnBefore: React.createElement(FaIcon_1.FaIcon, { icon: "circle-o" }) })),
                        React.createElement(FormRow_1.FormRow, null,
                            React.createElement(index_1.Field, { name: `${socialLink}.url`, label: "URL", component: index_1.FormField, innerComponent: index_1.TextBox, innerComponentProps: {
                                    disabled: this.isLinkedIn(index),
                                }, addOnBefore: React.createElement(FaIcon_1.FaIcon, { icon: "link" }) }))),
                    React.createElement("div", { className: "controls" },
                        React.createElement("button", { type: "button", disabled: index === 0, onClick: (e) => {
                                fields.swap(index, index - 1);
                                e.stopPropagation();
                            } },
                            React.createElement("i", { className: "fa fa-caret-up" })),
                        React.createElement("button", { type: "button", disabled: fields.length === (index + 1), onClick: (e) => {
                                fields.swap(index, index + 1);
                                e.stopPropagation();
                            } },
                            React.createElement("i", { className: "fa fa-caret-down" })),
                        React.createElement("button", { type: "button", disabled: fields.length === 1 || this.isLinkedIn(index), onClick: (e) => {
                                fields.remove(index);
                                e.stopPropagation();
                            } },
                            React.createElement("i", { className: "fa fa-trash" }))))))),
                React.createElement("div", { className: "field-array-button-bar" },
                    React.createElement("button", { type: "button", onClick: () => fields.push({}) }, "+ Social link")))));
    }
}
exports.SocialLinks = SocialLinks;
//# sourceMappingURL=SocialLinks.js.map