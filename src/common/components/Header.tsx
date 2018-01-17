import * as React from "react";
import { Link } from "react-router-dom";
import * as commonTypes from "../../common/typings";
import { LoggedUserDropdown } from "./LoggedUserDropdown";
import { Logo } from "./Logo";
import { CommunityDropdown } from "./CommunityDropdown";
import { getLoginUrl } from "../../server/helpers/routeHelper";

interface HeaderProps {
    loggedUser: commonTypes.CurrentUserProfile;
}

const Header: React.SFC<HeaderProps> = ({loggedUser}) => {
    const rightComponent = loggedUser.id
        ? <LoggedUserDropdown loggedUser={loggedUser}/>
        : <a href={getLoginUrl()} className="button vibrant">Sign in</a>;

    return (
        <div className="main-header-wrapper">
            <header className="header">
                <div className="header-content">
                    <Link to="/" className="logo-wrapper">
                        <Logo/>
                    </Link>
                    <ul className="header-content-list">
                        <li className="important-item">
                            <Link to="/d/docs">Docs</Link>
                        </li>
                        <li>
                            <CommunityDropdown/>
                        </li>
                        <li className="important-item">
                            {rightComponent}
                        </li>
                    </ul>
                </div>
            </header>
        </div>
    );
};

export { Header };
