import * as React from "react";

interface FormRow {
    children: React.ReactNode;
}

const FormRow: React.SFC<FormRow> = ({children}: FormRow) => (
    <div className="form-row">
        {children}
    </div>
);

export { FormRow };
