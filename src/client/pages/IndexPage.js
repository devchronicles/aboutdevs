import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SearchWrapper from '../components/SearchWrapper';
import Hero from '../components/Hero';
import SearchBar from '../components/SearchBar';
import SearchResult from '../components/SearchResult';


import { changeCriteria } from '../redux/search/searchActions';
import { profiles } from '../lib/stubs';

const IndexPage = ({ search, searchActions }) => <div className="page-wrapper">
    <SearchWrapper>
        <Hero />
        <SearchBar search={search} searchActions={searchActions} />
    </SearchWrapper>
    <SearchResult profiles={profiles} />
</div>;

IndexPage.propTypes = {
    search: PropTypes.object.isRequired,
    searchActions: PropTypes.object.isRequired
};

// CONNECT

const mapStateToProps = state => ({
    loggedUser: state.loggedUser,
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
