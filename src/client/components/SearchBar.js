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

        const toggleText = type === 'advanced' ? 'Menos opções' : 'Mais opções';
        const toggleAngle = type === 'advanced' ? 'up' : 'down';

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
            <div className="search-criteria">
                {searchComponent}
                <button
                    type="button"
                    className="search-type-toggle no-border"
                    onClick={this.handleToggleType}
                >
                    <span>{toggleText}</span>
                    <i className={`fa fa-angle-${toggleAngle}`} aria-hidden="true" />
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
