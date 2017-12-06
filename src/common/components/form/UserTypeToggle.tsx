import * as React from "react";
import * as ReduxForm from "redux-form";
import * as commonTypes from "../../typings/commonTypes";

interface UserTypeToggle extends ReduxForm.WrappedFieldProps<{}> {
}

const UserTypeToggle: React.SFC<UserTypeToggle> = (field) => {
    const { value, onChange } = field.input;

    const checkComponent = <i className="fa fa-check" />;

    // props for the professional button
    const professionalButtonProps = {
        className: value === commonTypes.UserProfileType.RECRUITER ? "pushed" : null,
        onClick: (event: React.SyntheticEvent<any>) => {
            event.preventDefault();
            onChange(commonTypes.UserProfileType.RECRUITER, undefined, undefined);
        },
    };

    // props for the non-professional button
    const nonProfessionalButtonProps = {
        className: value === commonTypes.UserProfileType.DEVELOPER ? "pushed" : null,
        onClick: (event: React.SyntheticEvent<any>) => {
            event.preventDefault();
            onChange(commonTypes.UserProfileType.DEVELOPER, undefined, undefined);
        },
    };

    return (
        <div className="button-group user-type-toggle">
            <button {...professionalButtonProps}>
                {checkComponent}
                <span>Sou um profissional</span>
            </button>
            <button {...nonProfessionalButtonProps}>
                {checkComponent}
                Estou em busca de profissionais
        </button>
        </div>
    );
};

export { UserTypeToggle };
