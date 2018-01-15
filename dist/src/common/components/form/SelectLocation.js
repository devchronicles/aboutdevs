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
const googlePlacesFormatHelper_1 = require("../../helpers/googlePlacesFormatHelper");
class SelectLocation extends React.Component {
    constructor() {
        super(...arguments);
        this.loadValues = (inputText, callback) => {
            if (this.currentFetchTimeout) {
                clearTimeout(this.currentFetchTimeout);
            }
            this.currentFetchTimeout = setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                try {
                    const res = yield httpClient.searchLocations(inputText);
                    const options = res.data.map((i) => ({ value: i, label: googlePlacesFormatHelper_1.getDataFromFormattedAddress(i).address }));
                    callback(null, { options, complete: true });
                }
                catch (ex) {
                    callback(ex, undefined);
                }
            }), 800);
        };
        this.filterOptions = (options) => options;
        this.handleChange = (row) => {
            const { onChange } = this.props.input;
            onChange(row ? row.value : null);
        };
    }
    render() {
        const { input: { value, onBlur }, meta: { error, touched }, placeholder } = this.props;
        const className = error && touched ? "invalid" : "";
        const adjustedValue = value ? {
            value,
            label: googlePlacesFormatHelper_1.getDataFromFormattedAddress(value).address,
        } : null;
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
            className,
            onBlur: () => onBlur(value),
        };
        return (React.createElement(ReactSelect.Async, Object.assign({ inputProps: { autoComplete: "off", autoCorrect: "off", spellCheck: "off" } }, props)));
    }
}
exports.SelectLocation = SelectLocation;
//# sourceMappingURL=SelectLocation.js.map