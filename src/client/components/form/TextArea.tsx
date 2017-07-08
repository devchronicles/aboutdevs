import * as React from 'react';
import * as ReduxForm from 'redux-form';

const TextArea: React.SFC<ReduxForm.WrappedFieldProps<{}>> = (props: ReduxForm.WrappedFieldProps<{}>) => {
    const { meta: { invalid, touched } } = props;
    const classes = ['form-control'];
    if (invalid && touched) {
        classes.push('invalid');
    }
    return <textarea rows={8} {...props.input} className={classes.join(' ')} />;
};

export { TextArea }
