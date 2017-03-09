import React, { PropTypes } from 'react';

const SimpleSearch = simpleSearch => (
    <div className="search-bar">
        <input
            id="search-text"
            name="search-text"
            type="text"
            placeholder="Ex: Diarista"
            value={simpleSearch.terms}
        />
        <button>Pesquisar</button>
    </div>
);

SimpleSearch.propTypes = {
    simpleSearch: PropTypes.shape({
        terms: PropTypes.string.isRequired
    }).isRequired
};
