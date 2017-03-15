import React, { Component, PropTypes } from 'react';
import { Async } from 'react-select';
import axios from 'axios';

class SelectCity extends Component {

    getValues(input, callback) {
        if (!input) {
            return Promise.resolve({ options: [] });
        }

        return axios.get(`/api/cities?q=${input}`)
            .then(res => {
                callback(null, {
                    options: res.data,
                    cache: false
                });
            });
    }

    handleChange() {

    }

    render() {
        const { value } = this.props;
        return (
            <Async value={value} onChange={this.handleChange} loadOptions={this.getValues} valueKey="id" labelKey="name" />
        );
    }
}

SelectCity.propTypes = {
    value: PropTypes.object
};

export default SelectCity;
