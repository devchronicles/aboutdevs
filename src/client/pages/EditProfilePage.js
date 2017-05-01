import React from 'react';
import { connect } from 'react-redux';

const EditProfilePages = () => <div className="page-wrapper">
    Fuck
</div>;

const mapStateToProps = state => ({
    loggedUser: state.loggedUser
});

// CONNECT

export default connect(
    mapStateToProps
)(EditProfilePages);
