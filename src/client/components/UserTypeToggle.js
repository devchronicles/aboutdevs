import React from 'react';
import PropTypes from 'prop-types';

const UserTypeToggle = (userType, onChange) => (
    <div className="button-group user-type-toggle">
        <button className="pushed" onClick={() => onChange(0)}>
            <i className="fa fa-check" aria-hidden="true" />
            <span>Sou um profissional</span>
        </button>
        <button onClick={() => onChange(1)}>Estou em busca de profissionais</button>
    </div>
);

UserTypeToggle.propTypes = {
    userType: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
};

export default UserTypeToggle;
