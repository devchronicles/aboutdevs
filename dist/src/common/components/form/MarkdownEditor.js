"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_mde_1 = require("react-mde");
class MarkdownEditor extends React.Component {
    constructor() {
        super(...arguments);
        this.handleValueChange = (value) => {
            const { onChange } = this.props.input;
            onChange(value);
        };
    }
    render() {
        const { name, value } = this.props.input;
        return (React.createElement(react_mde_1.default, { textAreaProps: { id: name, name, rows: 20 }, value: value, onChange: this.handleValueChange, commands: react_mde_1.ReactMdeCommands.getDefaultCommands(), visibility: { preview: false } }));
    }
}
exports.MarkdownEditor = MarkdownEditor;
//# sourceMappingURL=MarkdownEditor.js.map