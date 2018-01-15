"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const SearchForm_1 = require("./SearchForm");
const Logo_1 = require("./Logo");
class IndexSearchFormWrapper extends React.Component {
    render() {
        const { handleSearchSubmit } = this.props;
        return (React.createElement("div", { className: "index-search-form" },
            React.createElement("div", { className: "logo-wrapper" },
                React.createElement("span", { className: "index-hero" },
                    React.createElement("div", { className: "hero-text" },
                        React.createElement(Logo_1.Logo, null)))),
            React.createElement("div", { className: "search-criteria" },
                React.createElement(SearchForm_1.SearchForm, { onSubmit: handleSearchSubmit })),
            React.createElement("div", { className: "register-wrapper" },
                React.createElement("p", { className: "title" }, "Are you a Software Developer?"),
                React.createElement("ul", null,
                    React.createElement("ul", null,
                        React.createElement("li", null,
                            "Create a professional profile; Link your social media; Upload your CV and showcase your skills and portfolio. ",
                            React.createElement("a", { href: "/d/about" }, "Learn more"),
                            "."))),
                React.createElement("a", { href: "/auth/linkedin", className: "button sign-in faded" }, "Create your free developer profile"))));
    }
}
exports.IndexSearchFormWrapper = IndexSearchFormWrapper;
//# sourceMappingURL=IndexSearchFormWrapper.js.map