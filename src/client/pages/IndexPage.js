import React from 'react';
import { connect } from 'react-redux';
import Hero from '../components/Hero';
import SearchResult from '../components/SearchResult';

import { searchChange } from '../redux/search/searchActions';
import { profiles } from '../lib/stubs';

const IndexPage = () => (
    <div className="page-wrapper">
        <Hero />
        <SearchResult profiles={profiles} />
    </div>
);

// CONNECT

const mapStateToProps = state => ({
    search: state.search
});

const mapDispatchToProps = {
    searchChange
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IndexPage);
