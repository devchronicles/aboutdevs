import * as React from "react";
import { Markdown } from "../components/Markdown";
import { getDocsMarkdown } from "../docs/docsMarkdown";
import { Logo } from "../components/Logo";

interface DocsPageProps {

}

interface DocsPageState {

}

export class DocsPage extends React.Component<DocsPageProps, DocsPageState> {
    render() {
        return (
            <div className="page-wrapper">
                <div className="background-page-wrapper">
                    <div className="docs-page-wrapper">
                        <Logo/>
                        <Markdown markdown={getDocsMarkdown()}/>
                    </div>
                </div>
            </div>
        );
    }
}
