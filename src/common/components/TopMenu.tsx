import * as React from "react";
import { LoggedUserDropdown } from "./LoggedUserDropdown";
import * as commonTypes from "../../common/typings";

interface TopMenuProps {
    loggedUser: commonTypes.CurrentUserProfile;
}

const TopMenu: React.SFC<TopMenuProps> = (props) => (
    <ul className="top-menu">
        <li>
            <LoggedUserDropdown loggedUser={props.loggedUser} />
        </li>
    </ul>
);

export { TopMenu };
