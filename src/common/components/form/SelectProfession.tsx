import * as React from "react";
import * as ReactSelect from "react-select";
import * as ReduxForm from "redux-form";
import * as stringHelper from "../../../common/helpers/stringHelper";
import { searchProfessions } from "../../httpClient";

interface SelectProfessionProps extends ReduxForm.WrappedFieldProps<{}> {
    placeholder: string;
}

class SelectProfession extends React.Component<SelectProfessionProps, {}> {

    private currentFetchTimeout: any;

    private loadValues = (inputText: string, callback: (err: any, result: ReactSelect.AutocompleteResult) => void) => {

        if (this.currentFetchTimeout) {
            clearTimeout(this.currentFetchTimeout);
        }
        this.currentFetchTimeout = setTimeout(() => {
            searchProfessions(inputText)
                .then((res) => {
                    const options = res.data.map((i: any) => ({value: i, label: i}));
                    callback(null, {options, complete: true});
                })
                .catch((error) => callback(error, undefined));
        }, 800);
    }

    private handleChange = (row: any) => {
        const {onChange} = this.props.input;
        onChange(row ? row.value : null);
    }

    private isOptionUnique = ({option, options}: ({ option: ReactSelect.Option, options: ReactSelect.Option[] })) => {
        const selectedValue = option.value ? (option.value as string).toLowerCase() : "";
        return !options.map((o: ReactSelect.Option) => stringHelper.removeDiacritics(o.value as string).toLowerCase()).includes(selectedValue);
    }

    public render() {
        const {input: {value, onBlur}, meta: {error, touched}} = this.props;
        const className = error && touched ? "invalid" : "";
        const adjustedValue = {
            value,
            label: value,
        };

        return (
            <ReactSelect.AsyncCreatable
                value={adjustedValue}
                onChange={this.handleChange}
                inputProps={{autoComplete: "off", autoCorrect: "off", spellCheck: "off"}}
                loadOptions={this.loadValues}
                filterOption={(o) => true}
                labelKey="label"
                valueKey="value"
                placeholder=""
                loadingPlaceholder="Carregando..."
                searchPromptText="Digite para pesquisar"
                noResultsText="Profissão não encontrada, mas pode deixar assim mesmo"
                promptTextCreator={(label) => `Criar opção '${label}'`}
                ignoreCase={false}
                ignoreAccents={false}
                cache={false}
                className={className}
                isOptionUnique={this.isOptionUnique}
                onBlur={() => onBlur(value)}
            />
        );
    }
}

export { SelectProfession };
