import * as React from 'react';
import { LoggedUserDropdown } from './LoggedUserDropdown';
import * as commonTypes from '../../common/typings';

interface ITopMenuProps {
    loggedUser: commonTypes.ReduxCurrentUserProfile;
}

const TopMenu: React.SFC<ITopMenuProps> = (props) => (
    <ul className="top-menu">
        <li>
            <LoggedUserDropdown loggedUser={props.loggedUser} />
        </li>
    </ul>
);

export { TopMenu };
