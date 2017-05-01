import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import LoggedUserDropdown from './LoggedUserDropdown';

const Header = ({ loggedUser }) => {
    const rightComponent = loggedUser.id
        ? <LoggedUserDropdown loggedUser={loggedUser} />
        : <Link to="/login" className="button vibrant" >Entrar</Link>;

    return (<header className="header">
        <Link to="/" className="logo">
            INDIE JOBS
            </Link>
        {rightComponent}
    </header>);
};

Header.propTypes = {
    loggedUser: PropTypes.object.isRequired
};

export default Header;
