import React from 'react';
import PropTypes from 'prop-types';

const DocumentSection = ({ className, visible, children }) => {
    const finalClassName = !visible ? className += ' hidden' : className;
    return (<div className={`document-section ${finalClassName}`}>
        {children}
    </div>);
};

DocumentSection.propTypes = {
    className: PropTypes.string,
    visible: PropTypes.bool,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

DocumentSection.defaultProps = {
    className: null,
    visible: true,
    children: null
};

export default DocumentSection;
