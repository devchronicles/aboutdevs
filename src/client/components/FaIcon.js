import React from 'react';
import PropTypes from 'prop-types';

const FaIcon = ({ icon, className }) => (<i className={`fa fa-${icon} ${className}`} aria-hidden="true" />);

FaIcon.propTypes = {
    icon: PropTypes.string.isRequired,
    className: PropTypes.string
};

FaIcon.defaultProps = {
    className: ''
};

export default FaIcon;
