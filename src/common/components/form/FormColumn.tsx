import * as React from "react";

export interface FormColumn {
    children: string | JSX.Element | JSX.Element[];
    style?: any;
    eq: boolean;
}

export const FormColumn: React.SFC<FormColumn> = ({eq, style, children}) => (
    <div className={`form-column ${eq ? "eq" : ""}`} style={style}>
        {children}
    </div>
);
