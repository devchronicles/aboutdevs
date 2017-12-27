import * as React from "react";
import * as ReduxForm from "redux-form";
import { ColorResult, TwitterPicker } from "react-color";

interface ColorPickerProps extends ReduxForm.WrappedFieldProps<{}> {
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
                        colors={["#025B12", "#3073b5", "#DF5D4A", "#637F7D", "#314238", "#171C1A", "#32343a", "#CCCCCC", "#E2E2E2", "#FFFFFF"]}
                    />
                </div>
            </div>
        );
    }
}
