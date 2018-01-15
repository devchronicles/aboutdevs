"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_select_1 = require("react-select");
const socialLinks_1 = require("../../data/socialLinks");
class SelectSocialLink extends React.Component {
    constructor() {
        super(...arguments);
        this.handleChange = (value) => {
            const { onChange } = this.props.input;
            onChange(value.value);
        };
        this.renderOption = (option) => {
            return React.createElement("span", null,
                " ",
                React.createElement("i", { className: option.iconClass, style: { width: 20 } }),
                " ",
                option.label);
        };
    }
    render() {
        const { input: { value, onBlur }, meta: { error, touched }, placeholder, disabled, selectedSocialLinks, index } = this.props;
        const className = error && touched ? "invalid" : "";
        const options = socialLinks_1.socialLinks.map((sl) => ({
            value: sl.value,
            label: sl.label,
            iconClass: sl.iconClass,
        })).sort((a, b) => {
            if (a.value < b.value)
                return -1;
            if (a.value > b.value)
                return +1;
            return 0;
        }).filter((sl) => (selectedSocialLinks && index)
            ? selectedSocialLinks.findIndex(((ssl, i) => ssl.website === sl.value && i !== index)) === -1
            : true);
        const props = {
            value,
            options,
            labelKey: "label",
            valueKey: "value",
            placeholder: placeholder || "",
            loadingPlaceholder: "Localizando endereço...",
            searchPromptText: "Digite para pesquisar",
            noResultsText: "Não foi possível encontrar o endereço",
            ignoreCase: false,
            ignoreAccents: false,
            cache: false,
            className,
            onChange: this.handleChange,
            optionRenderer: this.renderOption,
            disabled,
            onBlur: () => onBlur(value),
        };
        return (React.createElement(react_select_1.default, Object.assign({}, props)));
    }
}
SelectSocialLink.defaultProps = {
    disabled: false,
};
exports.SelectSocialLink = SelectSocialLink;
//# sourceMappingURL=SelectSocialLink.js.map