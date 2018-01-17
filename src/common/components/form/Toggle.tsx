import * as React from "react";
import * as ReduxForm from "redux-form";

interface ToggleProps extends ReduxForm.WrappedFieldProps {
    falseLabel: string;
    trueLabel: string;
}

interface ToggleState {
}

export class Toggle extends React.Component<ToggleProps, ToggleState> {
    static defaultProps: Partial<ToggleProps>;

    render() {
        const {falseLabel, trueLabel} = this.props;
        const {value, onChange} = this.props.input;

        const checkComponent = <i className="fa fa-check"/>;

        const falseProps = {
            className: value === false ? "pushed" : null,
            onClick: (event: React.SyntheticEvent<any>) => {
                event.preventDefault();
                onChange(false);
            },
        };

        const trueProps = {
            className: value === true ? "pushed" : null,
            onClick: (event: React.SyntheticEvent<any>) => {
                event.preventDefault();
                onChange(true);
            },
        };

        return (
            <div className="button-group user-type-toggle">
                <button {...falseProps}>
                    {checkComponent}
                    {falseLabel}
                </button>
                <button {...trueProps}>
                    {checkComponent}
                    {trueLabel}
                </button>
            </div>
        );
    }
}

Toggle.defaultProps = {
    falseLabel: "Disabled",
    trueLabel: "Enabled",
}
