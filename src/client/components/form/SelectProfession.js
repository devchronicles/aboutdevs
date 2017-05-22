import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AsyncCreatable } from 'react-select';
import { getProfessions } from '../../httpClient';
import * as stringHelper from '../../../common/helpers/stringHelper';

class SelectProfession extends Component {

    constructor() {
        super();
        this.loadValues = this.loadValues.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    loadValues(input, callback) {
        if (this.currentFetchTimeout) {
            clearTimeout(this.currentFetchTimeout);
        }
        this.currentFetchTimeout = setTimeout(() => {
            getProfessions(input)
                .then((res) => {
                    const options = res.data.map(i => ({ value: i, label: i }));
                    callback(null, { options });
                })
                .catch(error => callback(error));
        }, 800);
    }


    handleChange(row) {
        const { onChange } = this.props.input;
        onChange(row ? row.value : null);
    }

    render() {
        const { input: { value, onBlur }, meta: { error, touched } } = this.props;
        const className = error && touched ? 'invalid' : '';
        const adjustedValue = {
            value,
            label: value
        };

        const isOptionUnique = ({ option, options }) => {
            const selectedValue = option.value ? option.value.toLowerCase() : '';
            return !options.map(o => stringHelper.removeDiacritics(o.value).toLowerCase()).includes(selectedValue);
        };

        return (
            <AsyncCreatable
                value={adjustedValue}
                onChange={this.handleChange}
                loadOptions={this.loadValues}
                filterOption={o => o}
                labelKey="label"
                valueKey="value"
                // localization
                placeholder=""
                loadingPlaceholder="Carregando..."
                searchPromptText="Digite para pesquisar"
                noResultsText="Profissão não encontrada, mas pode deixar assim mesmo"
                promptTextCreator={label => `Criar profissão '${label}'`}
                ignoreCase={false}
                ignoreAccents={false}
                cache={false}
                className={className}
                isOptionUnique={isOptionUnique}
                onBlur={() => onBlur(value)}
            />
        );
    }
}

SelectProfession.propTypes = {
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired
};

SelectProfession.defaultProps = {
    allowCities: false
};

export default SelectProfession;
