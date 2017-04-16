import React from 'react';
import LoggedUserDropdown from './LoggedUserDropdown';

const TopMenu = () => (
    <ul className="top-menu">
        <li>
            <LoggedUserDropdown />
        </li>
    </ul>
);


export default TopMenu;
