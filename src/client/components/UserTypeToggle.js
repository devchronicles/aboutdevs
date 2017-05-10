import React from 'react';
import PropTypes from 'prop-types';

const UserTypeToggle = (userType, onChange) => (
    <div className="button-group">
        <button className="pressed" onClick={() => onChange(0)}>Sou um profissional</button>
        <button onClick={() => onChange(1)}>Estou em busca de profissionais</button>
    </div>
);

UserTypeToggle.propTypes = {
    userType: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
};

export default UserTypeToggle;
