import React from 'react';
import PropTypes from 'prop-types';

const TextArea = (field) => {
    const { meta: { invalid, touched } } = field;
    const classes = ['form-control'];
    if (invalid && touched) {
        classes.push('invalid');
    }
    return <textarea rows={8} {...field.input} className={classes.join(' ')} />;
};

TextArea.propTypes = {
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired
};

export default TextArea;
