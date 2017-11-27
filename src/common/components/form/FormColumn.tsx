import * as React from "react";

export interface IFormColumn {
    children: string | JSX.Element | JSX.Element[];
    style?: any;
    eq: boolean;
}

const FormColumn: React.SFC<IFormColumn> = ({ eq, style, children }) => (
    <div className={`form-column ${eq ? "eq" : ""}`} style={style}>
        {children}
    </div>
);

export { FormColumn };
