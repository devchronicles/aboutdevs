import * as React from "react";
import { Markdown } from "../components/Markdown";
import { getDocsMarkdown } from "../docs/docsMarkdown";

interface DocsPageProps {

}

interface DocsPageState {

}

export class DocsPage extends React.Component<DocsPageProps, DocsPageState> {
    render() {
        return (
            <div className="docs-page-wrapper">
                <Markdown markdown={getDocsMarkdown()}/>
            </div>
        );
    }
}
