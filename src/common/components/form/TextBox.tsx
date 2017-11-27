import * as React from "react";
import * as ReduxForm from "redux-form";

export const TextBox: React.SFC<ReduxForm.WrappedFieldProps<{}>> = (props) => {
    const {meta: {invalid, touched}} = props;
    const classes = ["form-control"];
    if (invalid && touched) {
        classes.push("invalid");
    }
    return <input autoComplete="off" autoCorrect="off" spellCheck={false} className={classes.join(" ")} type="text"/>;
};
