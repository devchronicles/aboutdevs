"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ReactActivity = require("react-activity");
const React = require("react");
const Dots = ReactActivity.Dots;
class SocialButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleLinkClick = (e) => {
            if (this.state.loading) {
                e.preventDefault();
            }
            else {
                this.setState({ loading: true });
            }
        };
        this.state = {
            loading: false,
        };
    }
    render() {
        const { url, faClass, text } = this.props;
        const finalText = this.state.loading ? React.createElement(Dots, { size: 20 }) : text;
        return (React.createElement("a", { className: "social-button", href: url, onClick: this.handleLinkClick },
            React.createElement("i", { className: `fa fa-${faClass}` }),
            React.createElement("span", { className: "text" }, finalText)));
    }
}
exports.SocialButton = SocialButton;
//# sourceMappingURL=SocialButton.js.map