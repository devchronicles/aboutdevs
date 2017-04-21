import React, { Component, PropTypes } from 'react';

class LoggedUserDropdown extends Component {

    constructor() {
        super();
        this.handleOpen = this.handleOpen.bind(this);
        this.state = {
            open: true
        };
    }

    handleOpen() {
        this.setState({ open: !this.state.open });
    }

    render() {
        const { loggedUser } = this.props;
        return (
            <div>
                <a className="head-nav-link">
                    <img alt="@andrerpena" className="avatar" src={loggedUser.photoUrl} height="20" width="20" />
                    <i className="fa fa-caret-down" aria-hidden="true" />
                </a>
                <div className="dropdown-menu-wrapper">
                    <div className="dropdown-menu">
                        <div className="dropdown-header header-nav-current-user css-truncate">
                            Logado como <strong className="css-truncate-target">andrerpena</strong>
                        </div>
                        <div className="dropdown-divider" />
                        <a
                            className="dropdown-item"
                            href="/andrerpena"
                            data-ga-click="Header, go to profile, text:your profile"
                        >
                            Seu perfil
                        </a>
                        <a
                            className="dropdown-item"
                            href="/andrerpena"
                            data-ga-click="Header, go to profile, text:your profile"
                        >
                            Sair
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

LoggedUserDropdown.PropTypes = {
    loggedUser: PropTypes.object.isRequired
};

export default LoggedUserDropdown;
