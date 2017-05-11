import React from 'react';

const PROFESSIONAL_VALUE = 0;
const NON_PROFESSIONAL_VALUE = 1;

const UserTypeToggle = (field) => {
    const { value, onChange } = field.input;

    const checkComponent = <i className="fa fa-check" aria-hidden="true" />;

    // props for the professional button
    const professionalButtonProps = {
        className: value === PROFESSIONAL_VALUE ? 'pushed' : null,
        onClick: (event) => {
            event.preventDefault();
            onChange(PROFESSIONAL_VALUE);
        }
    };

    // props for the non-professional button
    const nonProfessionalButtonProps = {
        className: value === NON_PROFESSIONAL_VALUE ? 'pushed' : null,
        onClick: (event) => {
            event.preventDefault();
            onChange(NON_PROFESSIONAL_VALUE);
        }
    };

    return (<div className="button-group user-type-toggle">
        <button {...professionalButtonProps}>
            {checkComponent}
            <span>Sou um profissional</span>
        </button>
        <button {...nonProfessionalButtonProps}>
            {checkComponent}
            Estou em busca de profissionais
        </button>
    </div>);
};

export default UserTypeToggle;
