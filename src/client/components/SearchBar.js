import React, { Component, PropTypes } from 'react';
import SearchBarSimple from './SearchBarSimple';
import SearchBarAdvanced from './SearchBarAdvanced';

class SearchBar extends Component {

    constructor(props) {
        super(props);
        this.handleToggleType = this.handleToggleType.bind(this);
    }

    handleToggleType() {
        const { searchTypeToggle } = this.props;
        searchTypeToggle();
    }

    render() {
        const {
            type,
            simpleSearch,
            advancedSearch
        } = this.props;

        let searchComponent = null;

        switch (type) {
            case 'simple':
                searchComponent = <SearchBarSimple simpleSearch={simpleSearch} />;
                break;
            case 'advanced':
                searchComponent = <SearchBarAdvanced advancedSearch={advancedSearch} />;
                break;
            default:
                throw Error(`Unsupported search type. Type: ${type}`);
        }

        return (
            <div>
                {searchComponent}
                <button
                    type="button"
                    className="search-type-toggle"
                    onClick={this.handleToggleType}
                >
                    <span>Avançada</span>
                    <i className="fa fa-angle-down" aria-hidden="true" />
                </button>
            </div>
        );
    }
}

SearchBar.propTypes = {
    type: PropTypes.string.isRequired,
    searchTypeToggle: PropTypes.func.isRequired
};

export default SearchBar;
