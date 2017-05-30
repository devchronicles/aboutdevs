import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Async } from 'react-select';
import * as httpClient from '../../httpClient';

class SelectLocation extends Component {

    constructor() {
        super();
        this.loadValues = this.loadValues.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    loadValues(input, callback) {
        const { allowCities } = this.props;
        if (this.currentFetchTimeout) {
            clearTimeout(this.currentFetchTimeout);
        }
        this.currentFetchTimeout = setTimeout(() => {
            httpClient.getFormattedLocations(input, allowCities)
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
        const { input: { value, onBlur }, meta: { error, touched }, placeholder } = this.props;
        const className = error && touched ? 'invalid' : '';
        const adjustedValue = value ? {
            value,
            label: value
        } : null;

        return (
            <Async
                value={adjustedValue}
                onChange={this.handleChange}
                loadOptions={this.loadValues}
                filterOption={o => o}
                labelKey="label"
                valueKey="value"
                // localization
                placeholder={placeholder}
                loadingPlaceholder="Carregando..."
                searchPromptText="Digite para pesquisar"
                noResultsText="Não foi possível encontrar o endereço"
                ignoreCase={false}
                ignoreAccents={false}
                cache={false}
                className={className}
                onBlur={() => onBlur(value)}
            />
        );
    }
}

SelectLocation.propTypes = {
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
    allowCities: PropTypes.bool,
    placeholder: PropTypes.string
};

SelectLocation.defaultProps = {
    allowCities: false,
    placeholder: ''
};

export default SelectLocation;
