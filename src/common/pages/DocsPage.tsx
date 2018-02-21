import * as React from "react";
import { Markdown } from "../components/Markdown";
import { getDocsMarkdown } from "../docs/docsMarkdown";
import { Logo } from "../components/Logo";
import YouTube from "react-youtube";

interface DocsPageProps {

}

interface DocsPageState {

}

export class DocsPage extends React.Component<DocsPageProps, DocsPageState> {
    render() {
        return (
            <div className="page-wrapper">
                <div className="docs-page-wrapper">
                    <Logo/>
                    <div className="youtube-container">
                        <YouTube
                            videoId={"AKfc_RTBU6A"}
                            opts={{
                                width: "100%",
                                height: "550px",
                            }}
                        />
                    </div>
                    <Markdown markdown={getDocsMarkdown()}/>
                </div>
            </div>
        );
    }
}
