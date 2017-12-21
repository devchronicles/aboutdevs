import * as React from "react";
import * as ReduxForm from "redux-form";

export interface TextBoxProps extends ReduxForm.WrappedFieldProps<{}> {
    disabled?: boolean;
}

export const TextBox: React.SFC<TextBoxProps> = (props) => {
    const {meta: {invalid, touched}, input, disabled} = props;
    const classes = ["form-control"];
    if (invalid && touched) {
        classes.push("invalid");
    }
    return (
        <input
            {...input}
            disabled={disabled}
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            className={classes.join(" ")}
            type="text"
        />
    );
};

TextBox.defaultProps = {
    disabled: false,
}