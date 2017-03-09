import React, { PropTypes } from 'react';
import SearchBarSimple from './SearchBarSimple';
import SearchBarAdvanced from './SearchBarAdvanced';

const SearchBar = ({ type }) => {
    let searchComponent = null;

    switch (type) {
        case 'simple':
            searchComponent = <SearchBarSimple />;
            break;
        case 'advanced':
            searchComponent = <SearchBarAdvanced />;
            break;
        default:
            throw Error(`Unsupported search type. Type: ${type}`);
    }

    return (
        <div className="search-wrapper">
            {searchComponent}
            <div className="search-type-toggle">
                <span>Avançada</span>
                <i className="fa fa-angle-down" aria-hidden="true" />
            </div>
        </div>);
};

SearchBar.propTypes = {
    type: PropTypes.string.isRequired
};

export default SearchBar;
