import * as React from "react";
import * as ReactSelect from "react-select";
import * as ReduxForm from "redux-form";
import * as httpClient from "../../httpClient";
import { getDataFromFormattedAddress } from "../../helpers/locationFormatHelper";

interface SelectLocationProps extends ReduxForm.WrappedFieldProps {
    placeholder: string;
}

class SelectLocation extends React.Component<SelectLocationProps, {}> {

    private currentFetchTimeout: any;

    private loadValues = (inputText: string, callback: (err: any, result: ReactSelect.AutocompleteResult) => void) => {
        if (this.currentFetchTimeout) {
            clearTimeout(this.currentFetchTimeout);
        }
        this.currentFetchTimeout = setTimeout(async () => {
            try {
                const res = await httpClient.searchLocations(inputText);
                const options = res.data.map((i: any) => ({value: i, label: getDataFromFormattedAddress(i).address}));
                callback(null, {options, complete: true});
            } catch (ex) {
                callback(ex, undefined);
            }
        }, 800);
    }

    private filterOptions = (options: any) => options;

    private handleChange = (row: any) => {
        const {onChange} = this.props.input;
        onChange(row ? row.value : null);
    }

    public render() {
        const {input: {value, onBlur}, meta: {error, touched}, placeholder} = this.props;
        const className = error && touched ? "invalid" : "";

        const adjustedValue = value ? {
            value,
            label: getDataFromFormattedAddress(value).address,
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

        return (
            <ReactSelect.Async
                inputProps={{autoComplete: "off", autoCorrect: "off", spellCheck: "off"}}
                {...props}
            />
        );
    }
}

export { SelectLocation };
