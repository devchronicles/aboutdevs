"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Markdown_1 = require("../components/Markdown");
const docsMarkdown_1 = require("../docs/docsMarkdown");
const Logo_1 = require("../components/Logo");
class DocsPage extends React.Component {
    render() {
        return (React.createElement("div", { className: "page-wrapper" },
            React.createElement("div", { className: "background-page-wrapper" },
                React.createElement("div", { className: "docs-page-wrapper" },
                    React.createElement(Logo_1.Logo, null),
                    React.createElement(Markdown_1.Markdown, { markdown: docsMarkdown_1.getDocsMarkdown() })))));
    }
}
exports.DocsPage = DocsPage;
//# sourceMappingURL=DocsPage.js.map