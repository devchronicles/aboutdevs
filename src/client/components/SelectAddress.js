import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Async } from 'react-select';
import { getAddresses } from '../httpClient';

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
            getAddresses(input, allowCities)
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

SelectLocation.propTypes = {
    input: PropTypes.object.isRequired,
    allowCities: PropTypes.bool
};

SelectLocation.defaultProps = {
    allowCities: false
};

export default SelectLocation;
