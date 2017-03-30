import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class Header extends Component {
    render() {
        const { loggedUser } = this.props;

        const userDropdown = <a href="#"> { loggedUser.displayName } </a>;
        const loginButton = <Link to="/login" className="button vibrant" >Entrar</Link>;

        const rightComponent = loggedUser.id ? userDropdown : loginButton;

        return (<header className="header">
            <a className="logo">
                INDIE JOBS
            </a>
            { rightComponent }
        </header>);
    }
}

Header.PropTypes = {
    loggedUser: PropTypes.object.isRequired
};

export default Header;
