import React, { Component, PropTypes } from 'react';
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
                        options: res.data,
                        cache: false
                    });
                });
        }, 500);
    }

    handleChange(row) {
        debugger;
    }

    render() {
        const { value } = this.props;

        const myValue = { id: 1980, name: 'Juiz de Fora' }


        return (
            <Async value={myValue} onChange={this.handleChange} loadOptions={this.loadValues} valueKey="id" labelKey="name" />
        );
    }
}

SelectCity.propTypes = {
    value: PropTypes.object
};

export default SelectCity;
