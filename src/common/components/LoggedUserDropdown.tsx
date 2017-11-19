import * as React from 'react';
import {Dropdown, DropdownDivider, DropdownHeader, DropdownItem} from './Dropdown';
import * as commonTypes from '../typings/commonTypes';

interface LoggedUserDropdownProps {
    loggedUser: commonTypes.CurrentUserProfile;
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
                <DropdownItem linkTo={`/${id}`} text="Seu perfil"/>
                <DropdownItem linkTo={`/config/edituserprofile`} text="Editar seu perfil"/>
                <DropdownItem href="/auth/logout" text="Sair"/>
            </Dropdown>
        );
    }
}

export {LoggedUserDropdown};
