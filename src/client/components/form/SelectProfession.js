import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Async } from 'react-select';
import { getProfessions } from '../../httpClient';

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
                noResultsText="Profissão não encontrada, mas pode deixar assim mesmo"
                ignoreCase={false}
                ignoreAccents={false}
                cache={false}
                className={className}
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
