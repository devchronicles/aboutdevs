import * as React from "react";
import * as ReduxForm from "redux-form";

interface MarkdownEditorProps extends ReduxForm.WrappedFieldProps {

}

interface MarkdownEditorState {

}

export class MarkdownEditor extends React.Component<MarkdownEditorProps, MarkdownEditorState> {

    handleValueChange = (value: ReactMdeTypes.Value) => {
        const {onChange} = this.props.input;
        onChange(value as any);
    }

    render() {
        const {meta: {invalid, touched}, input: {name, value}} = this.props;
        return (
            <div className={`markdown-editor ${invalid ? "invalid" : ""}`}>
                <ReactMde
                    textAreaProps={{id: name, name, rows: 20}}
                    value={value}
                    onChange={this.handleValueChange}
                    commands={ReactMdeCommands.getDefaultCommands()}
                    visibility={{preview: false}}
                />
            </div>
        );
    }
}
