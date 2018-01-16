import * as React from "react";
import { Dropdown, DropdownDivider, DropdownHeader, DropdownItem } from "./Dropdown";
import * as commonTypes from "../typings/commonTypes";

interface LoggedUserDropdownProps {
    loggedUser: commonTypes.CurrentUserProfile;
}

class LoggedUserDropdown extends React.Component<LoggedUserDropdownProps> {

    public render() {
        const {loggedUser: {displayName, photoUrl, name}} = this.props;

        return (
            <Dropdown button={<img className="avatar" src={photoUrl}/>}>
                <DropdownHeader>
                    Signed in as <strong className="css-truncate-target">{displayName}</strong>
                </DropdownHeader>
                <DropdownDivider/>
                <DropdownItem linkTo={`/${name}`} content="Your profile"/>
                <DropdownItem linkTo={`/config/edituserprofile`} content="Edit your profile"/>
                <DropdownDivider/>
                <DropdownItem href="/auth/logout" content="Sign out"/>
            </Dropdown>
        );
    }
}

export {LoggedUserDropdown};
