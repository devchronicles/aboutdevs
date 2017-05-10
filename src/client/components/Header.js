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
        <ul>
            <li>
                <a href="#">Quanto custa?</a>
            </li>
            <li>
                <a href="#">Como funciona?</a>
            </li>
            <li>
                <a href="#">Perguntas frequentes</a>
            </li>
            <li>
                <a href="#">Blog</a>
            </li>
            <li>
                <a href="#">Contato</a>
            </li>
            <li>
                {rightComponent}
            </li>
        </ul>
    </header>);
};

Header.propTypes = {
    loggedUser: PropTypes.object.isRequired
};

export default Header;
