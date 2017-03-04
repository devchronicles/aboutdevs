import React, { PropTypes } from 'react';

const SocialButton = ({ text, url, faClass }) => (
    <a className="social-button" href={url}>
        <i className={`fa fa-${faClass}`} aria-hidden="true" />
        <span className="text">
            {text}
        </span>
    </a>
);

SocialButton.propTypes = {
    text: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    faClass: PropTypes.string.isRequired
};

const Login = () => (
    <div className="login-page-wrapper">
        <div className="login-card">
            <div className="title">
                Entrar no IndieJobs
            </div>
            <div className="body">
                <SocialButton text="Entrar com o Google" url="#" faClass="google" />
                <SocialButton text="Entrar com o Facebook" url="#" faClass="facebook" />
                <SocialButton text="Entrar com o LinkedIn" url="#" faClass="linkedin" />
            </div>
        </div>
    </div>
);

export default Login;
