import * as React from "react";
import * as ReactSelect from "react-select";
import * as ReduxForm from "redux-form";
import * as httpClient from "../../httpClient";

interface SelectTagsProps extends ReduxForm.WrappedFieldProps {
    placeholder: string;
}

class SelectTags extends React.Component<SelectTagsProps, {}> {

    private currentFetchTimeout: any;

    private loadValues = (inputText: string, callback: (err: any, result: ReactSelect.AutocompleteResult) => void) => {
        if (this.currentFetchTimeout) {
            clearTimeout(this.currentFetchTimeout);
        }
        this.currentFetchTimeout = setTimeout(async () => {
            try {
                const res = await httpClient.searchTags(inputText);
                const options = res.data.map((i: any) => ({value: i, label: i}));
                callback(null, {options, complete: true});
            } catch (error) {
                callback(error, undefined);
            }
        }, 800);
    }

    private filterOptions = (options: any) => options;

    private handleChange = (value: [{ value: string, label: string }]) => {
        const {onChange} = this.props.input;

        const adjustedValue = value
            ? value.map((v: { value: string, label: string }) => v.value)
            : [];

        onChange(adjustedValue as any);
    }

    public render() {
        const {input: {value, onBlur}, meta: {error, touched}, placeholder} = this.props;
        const className = error && touched ? "invalid" : "";

        const adjustedValue = value
            ? value.map((v: { value: string, label: string }) => ({value: v, label: v}))
            : [];

        const props = {
            value: adjustedValue,
            onChange: this.handleChange,
            loadOptions: this.loadValues,
            filterOption: this.filterOptions,
            labelKey: "label",
            valueKey: "value",
            placeholder: placeholder || "",
            loadingPlaceholder: "Localizando endereço...",
            searchPromptText: "Digite para pesquisar",
            noResultsText: "Não foi possível encontrar o endereço",
            ignoreCase: false,
            ignoreAccents: false,
            cache: false,
            multi: true,
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

export { SelectTags };
