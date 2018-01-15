"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_color_1 = require("react-color");
class ColorPicker extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = () => {
            this.setState({ open: !this.state.open });
        };
        this.handleClose = () => {
            this.setState({ open: false });
        };
        this.handleChange = (color) => {
            const { input: { onChange } } = this.props;
            onChange(color.hex);
        };
        this.setPopoverRef = (ref) => {
            this.popoverRef = ref;
        };
        this.setBlockRef = (ref) => {
            this.colorBlockRef = ref;
        };
        /**
         * Alert if clicked on outside of element
         */
        this.handleClickOutside = (event) => {
            if (this.state.open
                && this.popoverRef
                && this.colorBlockRef
                && !this.popoverRef.contains(event.target)
                && !this.colorBlockRef.contains(event.target)) {
                this.handleClose();
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
    render() {
        const { open } = this.state;
        const { input: { value } } = this.props;
        return (React.createElement("div", { className: "color-picker" },
            React.createElement("div", { className: "color-block", onClick: this.handleClick, style: { backgroundColor: value }, ref: this.setBlockRef }),
            React.createElement("div", { className: "picker-wrapper", style: { display: open ? "block" : "none" }, ref: this.setPopoverRef },
                React.createElement(react_color_1.TwitterPicker, { onChangeComplete: this.handleChange, color: value, colors: ["#DF5D4A", "#3073b5", "#3a5f49", "#5e4a61", "#934090", "#32343a", "#171C1A", "#CCCCCC", "#E2E2E2", "#FFFFFF"] }))));
    }
}
exports.ColorPicker = ColorPicker;
//# sourceMappingURL=ColorPicker.js.map