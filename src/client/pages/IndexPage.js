import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import SearchWrapper from '../components/SearchWrapper';
import Hero from '../components/Hero';
import SearchBar from '../components/SearchBar';
import SearchResult from '../components/SearchResult';


import { changeCriteria } from '../redux/search/searchActions';
import { profiles } from '../lib/stubs';

const IndexPage = ({ search, searchActions }) => {
    return <div className="page-wrapper">
        <SearchWrapper>
            <Hero />
            <SearchBar search={search} searchActions={searchActions} />
        </SearchWrapper>
        <SearchResult profiles={profiles} />
    </div>;
};
IndexPage.propTypes = {
    search: PropTypes.object.isRequired,
    searchActions: PropTypes.object.isRequired
}

// CONNECT

const mapStateToProps = state => ({
    search: state.search
});

const mapDispatchToProps = dispatch => ({
    searchActions: {
        changeCriteria: criteria => dispatch(changeCriteria(criteria))
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IndexPage);
