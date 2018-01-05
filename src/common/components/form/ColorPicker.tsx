import * as React from "react";
import * as ReduxForm from "redux-form";
import { ColorResult, TwitterPicker } from "react-color";

interface ColorPickerProps extends ReduxForm.WrappedFieldProps {
}

interface ColorPickerState {
    open: boolean;
}

export class ColorPicker extends React.Component<ColorPickerProps, ColorPickerState> {

    handleClick = () => {
        this.setState({open: !this.state.open});
    }
    handleClose = () => {
        this.setState({open: false});
    }
    handleChange = (color: ColorResult) => {
        const {input: {onChange}} = this.props;
        onChange(color.hex as any);
    }
    public setPopoverRef = (ref: any) => {
        this.popoverRef = ref;
    }
    public setBlockRef = (ref: any) => {
        this.colorBlockRef = ref;
    }
    private popoverRef: any;
    private colorBlockRef: any;
    /**
     * Alert if clicked on outside of element
     */
    private handleClickOutside = (event: Event) => {
        if (this.state.open
            && this.popoverRef
            && this.colorBlockRef
            && !this.popoverRef.contains(event.target)
            && !this.colorBlockRef.contains(event.target)) {
            this.handleClose();
        }
    }

    constructor(props: ColorPickerProps) {
        super(props);
        this.state = {
            open: false,
        };
    }

    public componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }

    public componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    render() {
        const {open} = this.state;
        const {input: {value}} = this.props;
        return (
            <div className="color-picker">
                <div
                    className="color-block"
                    onClick={this.handleClick}
                    style={{backgroundColor: value}}
                    ref={this.setBlockRef}
                />
                <div className="picker-wrapper" style={{display: open ? "block" : "none"}} ref={this.setPopoverRef}>
                    <TwitterPicker
                        onChangeComplete={this.handleChange}
                        color={value}
                        colors={["#DF5D4A", "#3073b5", "#3a5f49", "#5e4a61", "#934090", "#32343a", "#171C1A", "#CCCCCC", "#E2E2E2", "#FFFFFF"]}
                    />
                </div>
            </div>
        );
    }
}
