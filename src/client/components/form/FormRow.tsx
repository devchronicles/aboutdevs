import * as React from 'react';

interface IFormRow {
    children: string | JSX.Element | JSX.Element[];
}

const FormRow: React.SFC<IFormRow> = ({ children }: IFormRow) => (
    <div className="form-row">
        {children}
    </div>
);

export { FormRow };
