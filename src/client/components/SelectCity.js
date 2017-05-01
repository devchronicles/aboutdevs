import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Async } from 'react-select';
import axios from 'axios';

class SelectCity extends Component {

    constructor() {
        super();
        this.loadValues = this.loadValues.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    loadValues(input, callback) {
        if (!input) {
            callback({ options: [] });
        }

        if (this.currentFetchTimeout) {
            clearTimeout(this.currentFetchTimeout);
        }
        this.currentFetchTimeout = setTimeout(() => {
            axios.get(`/api/cities?q=${input}`)
                .then((res) => {
                    callback(null, {
                        options: res.data
                    });
                });
        }, 500);
    }

    handleChange(row) {
        const { onChange } = this.props;
        onChange(row);
    }

    render() {
        const { value } = this.props;
        const adjustedValue = {
            id: value.cityId,
            completename: value.cityName
        };

        return (
            <Async
                value={adjustedValue}
                onChange={this.handleChange}
                loadOptions={this.loadValues}
                valueKey="id"
                labelKey="completename"
                // localization
                placeholder=""
                loadingPlaceholder="Carregando..."
                searchPromptText="Digite para pesquisar"
                noResultsText="Não veio nada :("
            />
        );
    }
}

SelectCity.propTypes = {
    value: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
};

export default SelectCity;
