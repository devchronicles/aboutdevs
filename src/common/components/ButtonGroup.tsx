import * as React from "react";

interface ButtonGroupProps {
}

const ButtonGroup: React.SFC<ButtonGroupProps> = ({ children }) => (
    <div className="button-group">
        {children}
    </div>
);

export { ButtonGroup };
