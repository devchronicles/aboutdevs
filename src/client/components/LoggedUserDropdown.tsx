import * as React from 'react';
import { Link } from 'react-router-dom';
import * as commonTypes from '../../common/typings';

interface LoggedUserDropdownProps {
    loggedUser: commonTypes.ReduxCurrentUserProfile;
};

interface LoggedUserDropdownState {
    open: boolean;
}

class LoggedUserDropdown extends React.Component<LoggedUserDropdownProps, LoggedUserDropdownState> {

    private wrapperRef: any;

    constructor(props: LoggedUserDropdownProps) {
        super(props);
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
    setWrapperRef = (node: any) => {
        this.wrapperRef = node;
    }


    handleOpen = () => {
        this.setState({ open: !this.state.open });
    }

    handleLinkClick = () => {
        this.setState({ open: false });
    }

    /**
     * Alert if clicked on outside of element
     */
    handleClickOutside = (event: Event) => {
        if (this.state.open && this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.setState({ open: false });
        }
    }

    render() {
        const { loggedUser: { id, displayName, photoUrl } } = this.props;
        const dropdownClass = this.state.open ? 'visible' : '';

        return (
            <div ref={this.setWrapperRef}>
                <button className="head-nav-link" onClick={this.handleOpen}>
                    <img
                        alt="@andrerpena"
                        className="avatar"
                        src={photoUrl}
                        height="20" width="20"
                    />
                    <i className="fa fa-caret-down" aria-hidden="true" />
                </button>
                <div className={`dropdown-menu-wrapper ${dropdownClass}`}>
                    <div className="dropdown-menu">
                        <div className="dropdown-header header-nav-current-user css-truncate">
                            Olá, <strong className="css-truncate-target">{displayName}</strong>
                        </div>
                        <div className="dropdown-divider" />
                        <Link
                            className="dropdown-item"
                            to={`/${id}`}
                            onClick={this.handleLinkClick}
                        >
                            <span>Seu perfil</span>
                        </Link>
                        <Link
                            className="dropdown-item"
                            to="/config/edituserprofile"
                            onClick={this.handleLinkClick}
                        >
                            <span>Editar seu perfil</span>
                        </Link>
                        <Link
                            className="dropdown-item"
                            to={'/'}
                            onClick={this.handleLinkClick}
                        >
                            Suas conexões
                        </Link>

                        <a
                            className="dropdown-item"
                            href="/auth/logout"
                        >
                            Sair
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export { LoggedUserDropdown };
