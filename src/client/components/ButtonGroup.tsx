import * as React from 'react';

interface IButtonGroupProps {
    childre: JSX.Element[];
}

const ButtonGroup: React.SFC<IButtonGroupProps> = ({ children }) => (
    <div className="button-group">
        {children}
    </div>
);

export { ButtonGroup }
