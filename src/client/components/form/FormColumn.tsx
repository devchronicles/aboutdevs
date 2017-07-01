import * as PropTypes from 'prop-types';
import * as React from 'react';

export interface IFormColumn {
    children: JSX.Element[];
    style: {};
    eq: boolean;
}

const FormColumn: React.SFC<IFormColumn> = ({ eq, style, children }) => (
    <div className={`form-column ${eq ? 'eq' : ''}`} style={style}>
        {children}
    </div>
);

export default FormColumn;
