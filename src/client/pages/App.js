import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import IndexPage from './IndexPage';

const App = ({ loggedUser }) => (
    <div className="container">
        <Header loggedUser={loggedUser} />
        <IndexPage />
    </div>
);

App.propTypes = {
    loggedUser: PropTypes.object.isRequired
};

// CONNECT

const mapStateToProps = state => ({
    loggedUser: state.loggedUser
});


export default connect(
    mapStateToProps
)(App);
