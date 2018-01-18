import * as React from "react";
import { Dropdown, DropdownDivider, DropdownHeader, DropdownItem } from "./Dropdown";
import * as commonTypes from "../typings/commonTypes";
import { getEditMyProfileUrl, getLogoutUrl, getUserProfileUrl } from "../../server/helpers/routeHelper";

interface LoggedUserDropdownProps {
    loggedUser: commonTypes.CurrentUserProfile;
}

class LoggedUserDropdown extends React.Component<LoggedUserDropdownProps> {

    public render() {
        const {loggedUser: {displayName, photoUrl, name, activated}} = this.props;

        return (
            <Dropdown button={<img className="avatar" src={photoUrl}/>}>
                <DropdownHeader>
                    Signed in as <strong className="css-truncate-target">{displayName}</strong>
                </DropdownHeader>
                <DropdownDivider/>
                {!activated && <DropdownHeader>
                    <span
                        className="not-activated">Your user is not active. Please finishing editing your profile.</span>
                </DropdownHeader>}
                {!activated && <DropdownDivider/>}
                <DropdownItem linkTo={getUserProfileUrl(name)} content="Your profile"/>
                <DropdownItem linkTo={getEditMyProfileUrl()} content="Edit your profile"/>
                <DropdownDivider/>
                <DropdownItem href={getLogoutUrl()} content="Sign out"/>
            </Dropdown>
        );
    }
}

export {LoggedUserDropdown};
