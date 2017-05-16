import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Async } from 'react-select';
import { getAddresses } from '../httpClient';

class SelectCity extends Component {

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
            getAddresses(input)
                .then((res) => {
                    const options = res.data.map(i => ({ value: i, label: i }));
                    callback(null, { options });
                })
                .catch(error => callback(error));
        }, 500);
    }


    handleChange(row) {
        const { onChange } = this.props.input;
        onChange(row ? row.value : null);
    }

    render() {
        const { value } = this.props.input;
        const adjustedValue = {
            value,
            label: value
        };

        return (
            <Async
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
                noResultsText="Não foi possível encontrar o endereço"
                ignoreCase={false}
                ignoreAccents={false}
                cache={false}
            />
        );
    }
}

SelectCity.propTypes = {
    input: PropTypes.object.isRequired
};

export default SelectCity;
