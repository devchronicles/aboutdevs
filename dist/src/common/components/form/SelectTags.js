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
const React = require("react");
const ReactSelect = require("react-select");
const httpClient = require("../../httpClient");
class SelectTags extends React.Component {
    constructor() {
        super(...arguments);
        this.loadValues = (inputText, callback) => {
            if (this.currentFetchTimeout) {
                clearTimeout(this.currentFetchTimeout);
            }
            this.currentFetchTimeout = setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                try {
                    const res = yield httpClient.searchTags(inputText);
                    const options = res.data.map((i) => ({ value: i, label: i }));
                    callback(null, { options, complete: true });
                }
                catch (error) {
                    callback(error, undefined);
                }
            }), 800);
        };
        this.filterOptions = (options) => options;
        this.handleChange = (value) => {
            const { onChange } = this.props.input;
            const adjustedValue = value
                ? value.map((v) => v.value)
                : [];
            onChange(adjustedValue);
        };
    }
    render() {
        const { input: { value, onBlur }, meta: { error, touched }, placeholder } = this.props;
        const className = error && touched ? "invalid" : "";
        const adjustedValue = value
            ? value.map((v) => ({ value: v, label: v }))
            : [];
        const props = {
            value: adjustedValue,
            onChange: this.handleChange,
            loadOptions: this.loadValues,
            filterOption: this.filterOptions,
            labelKey: "label",
            valueKey: "value",
            placeholder: placeholder || "",
            ignoreCase: false,
            ignoreAccents: false,
            cache: false,
            multi: true,
            className,
            onBlur: () => onBlur(value),
        };
        return (React.createElement(ReactSelect.Async, Object.assign({ inputProps: { autoComplete: "off", autoCorrect: "off", spellCheck: "off" } }, props)));
    }
}
exports.SelectTags = SelectTags;
//# sourceMappingURL=SelectTags.js.map