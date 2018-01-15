"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Showdown = require("showdown");
class Markdown extends React.Component {
    constructor(props) {
        super(props);
        this.converter = new Showdown.Converter();
        this.converter.setFlavor("github");
        this.converter.setOption("simpleLineBreaks", false);
    }
    render() {
        const { markdown } = this.props;
        const html = markdown ? this.converter.makeHtml(markdown) : "";
        return (React.createElement("div", { className: "markdown-body", dangerouslySetInnerHTML: { __html: html } }));
    }
}
exports.Markdown = Markdown;
//# sourceMappingURL=Markdown.js.map