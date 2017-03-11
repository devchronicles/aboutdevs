import React, { PropTypes } from 'react';
import FormGroup from './FormGroup';

const SearchBarAdvanced = advancedSearch => (
    <div className="advanced-search form">
        <div className="form-row">
            <FormGroup label="Profissional">
                <input type="text" placeholder="Ex:Diarista" />
            </FormGroup>
        </div>
        <div className="form-row">
            <FormGroup label="Local">
                <input type="text" placeholder="Ex:Diarista" />
            </FormGroup>
        </div>
        <button>Pesquisar</button>
    </div>
);

SearchBarAdvanced.propTypes = {
    advancedSearch: PropTypes.shape({
        terms: PropTypes.string.isRequired
    }).isRequired
};


export default SearchBarAdvanced;

