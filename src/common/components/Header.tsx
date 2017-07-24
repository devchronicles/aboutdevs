import * as React from 'react';
import { Link } from 'react-router-dom';
import * as commonTypes from '../../common/typings';
import { LoggedUserDropdown } from './LoggedUserDropdown';
import { Logo } from './Logo';

interface HeaderProps {
    loggedUser: commonTypes.CurrentUserProfile;
}

const Header: React.SFC<HeaderProps> = ({ loggedUser }) => {
    const rightComponent = loggedUser.id
        ? <LoggedUserDropdown loggedUser={loggedUser} />
        : <Link to="/login" className="button vibrant" >Entrar</Link>;

    return (
        <div className="header-wrapper">
            <header className="header">
                <Link to="/">
                    <Logo />
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
            </header>
        </div>
    );
};

export { Header }
