import React, { Component, PropTypes } from 'react';

class LoggedUserDropdown extends Component {

    constructor() {
        super();
        this.handleOpen = this.handleOpen.bind(this);
        this.state = {
            open: false
        };
    }

    handleOpen() {
        this.setState({ open: !this.state.open });
    }

    render() {
        return (
            <div className="dropdown-menu-wrapper">
                <div className="dropdown-menu">
                    <div className="dropdown-header header-nav-current-user css-truncate">
                        Signed in as <strong className="css-truncate-target">andrerpena</strong>
                    </div>
                    <div className="dropdown-divider" />
                    <a className="dropdown-item" href="/andrerpena" data-ga-click="Header, go to profile, text:your profile">
                        Your profile
                    </a>
                </div>
            </div>
        );
    }
}

LoggedUserDropdown.PropTypes = {
    loggedUser: PropTypes.object.isRequired
};

export default LoggedUserDropdown;
