import React from 'react';
import PropTypes from 'prop-types';

const DocumentSection = ({ className, children }) => {
    return (<div className={`document-section ${className}`}>
        {children}
    </div>);
};

DocumentSection.propTypes = {
    className: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
        React.PropTypes.arrayOf(PropTypes.node),
        React.PropTypes.node
    ])
};

DocumentSection.defaultProps = {
    labelFor: null,
    children: null
};

export default DocumentSection;
