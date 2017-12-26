import * as React from "react";
import ReactMde, { ReactMdeCommands, ReactMdeTypes } from "react-mde";
import * as ReduxForm from "redux-form";

interface MarkdownEditorProps extends ReduxForm.WrappedFieldProps<{}> {

}

interface MarkdownEditorState {

}

export class MarkdownEditor extends React.Component<MarkdownEditorProps, MarkdownEditorState> {

    handleValueChange = (value: ReactMdeTypes.Value) => {
        const {onChange} = this.props.input;
        onChange(value as any);
    }

    render() {
        const {name, value} = this.props.input;
        return (
            <ReactMde
                textAreaProps={{id: name, name}}
                value={value}
                onChange={this.handleValueChange}
                commands={ReactMdeCommands.getDefaultCommands()}
                visibility={{preview: false}}
            />
        );
    }
}
