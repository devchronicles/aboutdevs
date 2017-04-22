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

export default SocialButton;
