import * as React from 'react';
import * as ReactSelect from 'react-select';
import * as ReduxForm from 'redux-form';
import * as httpClient from '../../httpClient';

interface SelectLocationProps extends ReduxForm.WrappedFieldProps<{}> {
    allowCities: boolean;
    placeholder: string;
    strict: boolean;
}

class SelectLocation extends React.Component<SelectLocationProps, {}> {

    public static defaultProps: Partial<SelectLocationProps> = {
        strict: true,
    };

    private currentFetchTimeout: any;

    private loadValues = (inputText: string, callback: (err: any, result: ReactSelect.AutocompleteResult) => void) => {
        const {allowCities} = this.props;
        if (this.currentFetchTimeout) {
            clearTimeout(this.currentFetchTimeout);
        }
        this.currentFetchTimeout = setTimeout(() => {
            httpClient.searchLocations(inputText, allowCities)
                .then((res) => {
                    const options = res.data.map((i: any) => ({value: i, label: i}));
                    callback(null, {options, complete: true});
                })
                .catch((error) => callback(error, undefined));
        }, 800);
    }

    private filterOptions = (options: any) => options;

    private handleChange = (row: any) => {
        const {onChange} = this.props.input;
        onChange(row ? row.value : null);
    }

    public render() {
        const {input: {value, onBlur}, meta: {error, touched}, placeholder, strict} = this.props;
        const className = error && touched ? 'invalid' : '';
        const adjustedValue = value ? {
            value,
            label: value,
        } : null;

        const props = {
            value: adjustedValue,
            onChange: this.handleChange,
            loadOptions: this.loadValues,
            filterOption: this.filterOptions,
            labelKey: "label",
            valueKey: "value",
            placeholder: placeholder || '',
            loadingPlaceholder: "Localizando endereço...",
            searchPromptText: "Digite para pesquisar",
            noResultsText: "Não foi possível encontrar o endereço",
            ignoreCase: false,
            ignoreAccents: false,
            cache: false,
            className,
            onBlur: () => onBlur(value),
        };

        const notStrictProps = {
            promptTextCreator: (label:string) => `Utilizar endereço não exato: ${label}`,
        }

        return strict
            ? <ReactSelect.Async inputProps={{ autoComplete: 'off', autoCorrect: 'off', spellCheck: 'off' }} {...props} />
            : <ReactSelect.AsyncCreatable inputProps={{ autoComplete: 'off', autoCorrect: 'off', spellCheck: 'off' }} {...props} {...notStrictProps}/>;
    }
}

SelectLocation.defaultProps = {
    strict: true,
};

export {SelectLocation}
