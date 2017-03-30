import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

const App = ({ loggedUser, children }) => (
    <div className="container">
        <Header loggedUser={loggedUser} />
        {children}
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
