import React from 'react';
import { connect } from 'react-redux';

import IndexSearchForm from '../components/IndexSearchForm';

const IndexPage = () => (<div className="page-wrapper">
    <div className="index-page-wrapper">
        <IndexSearchForm />
    </div>
</div>);

// CONNECT

const mapStateToProps = state => ({
    loggedUser: state.loggedUser
});

export default connect(
    mapStateToProps
)(IndexPage);
