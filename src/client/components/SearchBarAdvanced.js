import React, { PropTypes } from 'react';

const SearchBarAdvanced = advancedSearch => (
    <div className="search-bar">
        <input
            id="search-text"
            name="search-text"
            type="text"
            placeholder="Ex: Diarista"
            value={advancedSearch.terms}
        />
        <button>Pesquisar</button>
    </div>
);

SearchBarAdvanced.propTypes = {
    advancedSearch: PropTypes.shape({
        terms: PropTypes.string.isRequired
    }).isRequired
};


export default SearchBarAdvanced;

