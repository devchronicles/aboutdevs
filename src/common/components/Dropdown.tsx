import * as React from 'react';

export const DropdownDivider: React.SFC<{}> = () => {
    return <div className="dropdown-divider"/>;
}

export const DropdownItem: React.SFC<{}> = (props) => {
    return (
        <li className="dropdown-item">
            {props.children}
        </li>
    );
}

export const DropdownHeader: React.SFC<{}> = (props) => {
    return (
        <div className="dropdown-header">
            {props.children}
        </div>
    );
}

interface DropdownProps {
    button: React.ReactNode;
}

interface DropdownState {
    open: boolean;
}

export class Dropdown extends React.Component<DropdownProps, DropdownState> {

    private wrapperRef: any;

    constructor(props: DropdownProps) {
        super(props);
        this.state = {
            open: false,
        };
    }

    public componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    public componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    /**
     * Set the wrapper ref
     */
    private setWrapperRef = (node: any) => {
        this.wrapperRef = node;
    }

    private handleOpen = () => {
        this.setState({open: !this.state.open});
    }

    /**
     * Alert if clicked on outside of element
     */
    private handleClickOutside = (event: Event) => {
        if (this.state.open && this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.setState({open: false});
        }
    }

    public render() {
        const {button, children} = this.props;
        const dropdownClass = this.state.open ? 'visible' : '';

        return (
            <div className="dropdown" ref={this.setWrapperRef}>
                <button className="dropdown-menu-button" onClick={this.handleOpen}>
                    <span className="dropdown-menu-button-content">
                        {button}
                    </span>
                    <i className="fa fa-caret-down"/>
                </button>
                <div className={`dropdown-menu-wrapper ${dropdownClass}`}>
                    <div className="dropdown-menu">
                        {children}
                    </div>
                </div>
            </div>
        );
    }
}