import * as React from "react";
import * as Showdown from "showdown";

interface MarkdownProps {
    markdown: string;
}

interface MarkdownState {

}

export class Markdown extends React.Component<MarkdownProps, MarkdownState> {
    converter: Showdown.Converter;

    constructor(props: MarkdownProps) {
        super(props);
        this.converter = new Showdown.Converter();
        this.converter.setFlavor("github");
        this.converter.setOption("simpleLineBreaks", false);
    }

    render() {
        const {markdown} = this.props;
        const html = markdown ? this.converter.makeHtml(markdown) : "";
        return (
            <div className="markdown-body" dangerouslySetInnerHTML={{__html: html}}/>
        );
    }
}
