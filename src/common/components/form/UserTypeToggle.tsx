import * as React from 'react';
import * as ReduxForm from 'redux-form';

const PROFESSIONAL_VALUE = 0;
const NON_PROFESSIONAL_VALUE = 1;

interface IUserTypeToggle extends ReduxForm.WrappedFieldProps<{}> {
}


const UserTypeToggle: React.SFC<IUserTypeToggle> = (field) => {
    const { value, onChange } = field.input;

    const checkComponent = <i className="fa fa-check" />;

    // props for the professional button
    const professionalButtonProps = {
        className: value === PROFESSIONAL_VALUE ? 'pushed' : null,
        onClick: (event: React.SyntheticEvent<any>) => {
            event.preventDefault();
            onChange(PROFESSIONAL_VALUE, undefined, undefined);
        }
    };

    // props for the non-professional button
    const nonProfessionalButtonProps = {
        className: value === NON_PROFESSIONAL_VALUE ? 'pushed' : null,
        onClick: (event: React.SyntheticEvent<any>) => {
            event.preventDefault();
            onChange(NON_PROFESSIONAL_VALUE, undefined, undefined);
        }
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
