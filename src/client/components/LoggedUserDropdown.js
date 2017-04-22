import React, { Component, PropTypes } from 'react';

class LoggedUserDropdown extends Component {

    constructor(props) {
        super(props);
        this.handleOpen = this.handleOpen.bind(this);
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.state = {
            open: false
        };
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    /**
     * Set the wrapper ref
     */
    setWrapperRef(node) {
        this.wrapperRef = node;
    }


    handleOpen() {
        this.setState({ open: !this.state.open });
    }

    /**
     * Alert if clicked on outside of element
     */
    handleClickOutside(event) {
        if (this.state.open && this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.setState({ open: false });
        }
    }

    render() {
        const { loggedUser } = this.props;
        const dropdownClass = this.state.open ? 'visible' : '';

        return (
            <div ref={this.setWrapperRef}>
                <button className="head-nav-link" onClick={this.handleOpen}>
                    <img
                        alt="@andrerpena"
                        className="avatar"
                        src={loggedUser.photoUrl}
                        height="20" width="20" />
                    <i className="fa fa-caret-down" aria-hidden="true" />
                </button>
                <div className={`dropdown-menu-wrapper ${dropdownClass}`}>
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
                            href="/auth/logout"
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

LoggedUserDropdown.propTypes = {
    loggedUser: PropTypes.object.isRequired
};

export default LoggedUserDropdown;
