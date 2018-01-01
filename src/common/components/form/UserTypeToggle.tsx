import * as React from "react";
import * as ReduxForm from "redux-form";
import * as commonTypes from "../../typings/commonTypes";

interface UserTypeToggle extends ReduxForm.WrappedFieldProps {
}

const UserTypeToggle: React.SFC<UserTypeToggle> = (field) => {
    const {value, onChange} = field.input;

    const checkComponent = <i className="fa fa-check"/>;

    const developerProps = {
        className: value === commonTypes.UserProfileType.DEVELOPER ? "pushed" : null,
        onClick: (event: React.SyntheticEvent<any>) => {
            event.preventDefault();
            onChange(commonTypes.UserProfileType.DEVELOPER);
        },
    };

    const recruiterProps = {
        className: value === commonTypes.UserProfileType.RECRUITER ? "pushed" : null,
        onClick: (event: React.SyntheticEvent<any>) => {
            event.preventDefault();
            onChange(commonTypes.UserProfileType.RECRUITER);
        },
    };

    return (
        <div className="button-group user-type-toggle">
            <button {...developerProps}>
                {checkComponent}
                I'm a developer
            </button>
            <button {...recruiterProps}>
                {checkComponent}
                <span>I'm a recruiter</span>
            </button>
        </div>
    );
};

export { UserTypeToggle };
