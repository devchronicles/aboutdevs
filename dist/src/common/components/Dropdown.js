"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_router_dom_1 = require("react-router-dom");
var DropdownMenuSize;
(function (DropdownMenuSize) {
    DropdownMenuSize[DropdownMenuSize["SMALL"] = 0] = "SMALL";
    DropdownMenuSize[DropdownMenuSize["MEDIUM"] = 1] = "MEDIUM";
    DropdownMenuSize[DropdownMenuSize["LARGE"] = 2] = "LARGE";
})(DropdownMenuSize = exports.DropdownMenuSize || (exports.DropdownMenuSize = {}));
exports.DropdownDivider = () => {
    return React.createElement("div", { className: "dropdown-divider" });
};
exports.DropdownItem = (props) => {
    const { linkTo, href, text, visible } = props;
    if (visible === false) {
        return null;
    }
    let linkComponent;
    if (linkTo) {
        linkComponent = React.createElement(react_router_dom_1.Link, { to: linkTo }, text);
    }
    else if (href) {
        linkComponent = React.createElement("a", { href: href }, text);
    }
    else {
        throw Error("Either linkTo or href should be provided to DropdownItem");
    }
    return (React.createElement("li", { className: "dropdown-item" }, linkComponent));
};
exports.DropdownHeader = (props) => {
    return (React.createElement("div", { className: "dropdown-header" }, props.children));
};
class Dropdown extends React.Component {
    constructor(props) {
        super(props);
        /**
         * Set the wrapper ref
         */
        this.setWrapperRef = (node) => {
            this.wrapperRef = node;
        };
        this.handleOpen = () => {
            this.setState({ open: !this.state.open });
        };
        this.handleOnMenuItemClick = () => {
            this.setState({ open: false });
        };
        /**
         * Alert if clicked on outside of element
         */
        this.handleClickOutside = (event) => {
            if (this.state.open && this.wrapperRef && !this.wrapperRef.contains(event.target)) {
                this.setState({ open: false });
            }
        };
        this.state = {
            open: false,
        };
    }
    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }
    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }
    static getClassForSize(size) {
        switch (size) {
            case DropdownMenuSize.SMALL:
                return "size-sm";
            case DropdownMenuSize.MEDIUM:
                return "size-md";
            case DropdownMenuSize.LARGE:
                return "size-lg";
        }
    }
    render() {
        const { button, children, className, size } = this.props;
        const dropdownClass = this.state.open ? "visible" : "";
        const finalClassName = `dropdown ${className ? className : ""}`;
        return (React.createElement("ul", { className: finalClassName, ref: this.setWrapperRef },
            React.createElement("button", { className: "dropdown-menu-button", onClick: this.handleOpen },
                React.createElement("span", { className: "dropdown-menu-button-content" }, button),
                React.createElement("i", { className: "fa fa-caret-down" })),
            React.createElement("div", { className: `dropdown-menu-wrapper ${dropdownClass} ${Dropdown.getClassForSize(size)}` },
                React.createElement("div", { className: "dropdown-menu", onClick: this.handleOnMenuItemClick }, children))));
    }
}
Dropdown.defaultProps = {
    size: DropdownMenuSize.SMALL,
};
exports.Dropdown = Dropdown;
//# sourceMappingURL=Dropdown.js.map