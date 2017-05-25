import React from 'react';
import { connect } from 'react-redux';

import IndexSearchForm from '../components/IndexSearchForm';

const IndexPage = () => (<div className="page-wrapper">
    <div className="index-page-wrapper">
        <div className="index-search-form">
            <div className="logo-wrapper">
                <span className="index-hero">
                    <div className="icon-box">
                        <i className="fa fa-briefcase" aria-hidden="true" />
                    </div>
                    <div className="hero-text">
                        <div className="hero-logo">IndieJobs</div>
                        <div className="hero-motto">do que você precisa hoje?</div>
                    </div>
                </span>
            </div>
            <IndexSearchForm />
            <div className="register-wrapper">
                <span className="text">
                    Quer participar do IndieJobs?
                </span>
                <button className="faded">
                    Cadastre-se
                </button>
            </div>
        </div>
    </div>
</div>);

// CONNECT

const mapStateToProps = state => ({
    loggedUser: state.loggedUser
});

export default connect(
    mapStateToProps
)(IndexPage);
