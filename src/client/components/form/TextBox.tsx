import * as React from 'react';
import * as ReduxForm from "redux-form";

const TextBox: React.SFC<ReduxForm.WrappedFieldProps<{}>> = (props: ReduxForm.WrappedFieldProps<{}>) => {
    const { meta: { invalid, touched } } = props;
    const classes = ['form-control'];
    if (invalid && touched) {
        classes.push('invalid');
    }
    return <input {...props.input} className={classes.join(' ')} type="text" />;
};

export default TextBox;
