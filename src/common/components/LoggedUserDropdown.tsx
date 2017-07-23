import * as React from 'react';
import {Link} from 'react-router-dom';
import {Dropdown, DropdownDivider, DropdownHeader, DropdownItem} from "./Dropdown";
import * as commonTypes from '../typings/commonTypes';

interface LoggedUserDropdownProps {
    loggedUser: commonTypes.ReduxCurrentUserProfile;
}

class LoggedUserDropdown extends React.Component<LoggedUserDropdownProps> {

    public render() {
        const {loggedUser: {id, displayName, photoUrl}} = this.props;

        return (
            <Dropdown button={<img alt="@andrerpena" className="avatar" src={photoUrl}/>}>
                <DropdownHeader>
                    Olá, <strong className="css-truncate-target">{displayName}</strong>
                </DropdownHeader>
                <DropdownDivider/>
                <DropdownItem>
                    <Link to={`/${id}`}>
                        <span>Seu perfil</span>
                    </Link>
                </DropdownItem>
                <DropdownItem>
                    <Link to="/config/edituserprofile">
                        <span>Editar seu perfil</span>
                    </Link>
                </DropdownItem>

                <DropdownItem>
                    <Link to="/config/edituserprofile">
                        <span>Editar seu perfil</span>
                    </Link>
                </DropdownItem>

                <DropdownItem>
                    <a href="/auth/logout">
                        Sair
                    </a>
                </DropdownItem>
            </Dropdown>
        );
    }
}

export {LoggedUserDropdown};
