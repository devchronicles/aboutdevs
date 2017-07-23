import * as React from 'react';
import {Link} from 'react-router-dom';

export enum DropdownMenuSize {
    SMALL = 0,
    MEDIUM = 1,
    LARGE = 2,
}

export const DropdownDivider: React.SFC<{}> = () => {
    return <div className="dropdown-divider"/>;
}

export const DropdownItem: React.SFC<{ linkTo?: string; href?: string; text: string, visible?: boolean; }> = (props) => {
    const {linkTo, href, text, visible} = props;
    if (visible === false) {
        return null;
    }
    let linkComponent;
    if (linkTo) {
        linkComponent = <Link to={linkTo}>{text}</Link>;
    } else if (href) {
        linkComponent = <a href={href}>{text}</a>;
    } else {
        throw Error('Either linkTo or href should be provided to DropdownItem');
    }

    return (
        <li className="dropdown-item">
            {linkComponent}
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
    size?: DropdownMenuSize;
    button: React.ReactNode;
    className?: string;
}

interface DropdownState {
    open: boolean;
}

export class Dropdown extends React.Component<DropdownProps, DropdownState> {

    public static defaultProps: Partial<DropdownProps> = {
        size: DropdownMenuSize.SMALL,
    };

    private wrapperRef: any;

    constructor(props: DropdownProps) {
        super(props);
        this.state = {
            open: false,
        };
    }

    private getClassForSize(size: DropdownMenuSize) {
        switch (size) {
            case DropdownMenuSize.SMALL:
                return 'size-sm';
            case DropdownMenuSize.MEDIUM:
                return 'size-md';
            case DropdownMenuSize.LARGE:
                return 'size-lg';
        }
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

    private handleOnMenuItemClick = () => {
        this.setState({open: false});
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
        const {button, children, className, size} = this.props;
        const dropdownClass = this.state.open ? 'visible' : '';

        const finalClassName = `dropdown ${className}`;

        return (
            <div className={finalClassName} ref={this.setWrapperRef}>
                <button className="dropdown-menu-button" onClick={this.handleOpen}>
                    <span className="dropdown-menu-button-content">
                        {button}
                    </span>
                    <i className="fa fa-caret-down"/>
                </button>
                <div className={`dropdown-menu-wrapper ${dropdownClass} ${this.getClassForSize(size)}`}>
                    <div className="dropdown-menu" onClick={this.handleOnMenuItemClick}>
                        {children}
                    </div>
                </div>
            </div>
        );
    }
}