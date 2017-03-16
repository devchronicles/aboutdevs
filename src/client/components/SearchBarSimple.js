import React, { PropTypes } from 'react';

const SimpleSearch = simpleSearch => (
    <div className="simple-search">
        <input
            id="search-text"
            name="search-text"
            type="text"
            placeholder="Ex: Diarista em São Paulo"
            value={simpleSearch.terms}
        />
        <button className="vibrant">Pesquisar</button>
    </div>
);

SimpleSearch.propTypes = {
    simpleSearch: PropTypes.shape({
        terms: PropTypes.string.isRequired
    }).isRequired
};

export default SimpleSearch;
