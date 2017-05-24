import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';
import Header from '../components/Header';
import IndexPage from './IndexPage';
import ProfileEditPage from './ProfileEditPage';
import SearchPage from './SearchPage';

const App = ({ loggedUser }) => (
    <div className="container">
        <Header loggedUser={loggedUser} />
        <Switch>
            <Route exact path="/search" component={SearchPage} />
            <Route exact path="/config/edituserprofile" component={ProfileEditPage} />
            <Route exact path="/" component={IndexPage} />
        </Switch>
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
