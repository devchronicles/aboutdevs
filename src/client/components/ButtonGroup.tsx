import * as React from 'react';

interface ButtonGroupProps {
    childre: JSX.Element[];
}

const ButtonGroup: React.SFC<ButtonGroupProps> = ({ children }) => (
    <div className="button-group">
        {children}
    </div>
);

export { ButtonGroup }
