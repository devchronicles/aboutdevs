import React from 'react';
import { connect } from 'react-redux';

import SearchWrapper from '../components/SearchWrapper';
import Hero from '../components/Hero';
import SearchForm from '../components/SearchForm';
import SearchResult from '../components/SearchResult';

import { profiles } from '../lib/stubs';

const IndexPage = () => <div className="page-wrapper">
    <SearchWrapper>
        <Hero />
        <SearchForm />
    </SearchWrapper>
    <SearchResult profiles={profiles} />
</div>;


// CONNECT

const mapStateToProps = state => ({
    loggedUser: state.loggedUser
});

export default connect(
    mapStateToProps
)(IndexPage);
