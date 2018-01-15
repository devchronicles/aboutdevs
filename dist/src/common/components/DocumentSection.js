"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
function getIcon(open) {
    return open
        ? React.createElement("i", { className: "fa fa-chevron-down", "aria-hidden": "true" })
        : React.createElement("i", { className: "fa fa-chevron-right", "aria-hidden": "true" });
}
const DocumentSection = ({ id, className, visible, open, title, collapsible, onToggleCollapsed, children }) => {
    return (React.createElement("section", { className: `document-section ${className} ${!visible ? "hidden" : ""}` },
        title && React.createElement("p", { className: "section-title", onClick: () => onToggleCollapsed ? onToggleCollapsed(id) : false },
            getIcon(open),
            React.createElement("span", null, title)),
        React.createElement("div", { className: `section-body ${(collapsible && !open ? "hidden" : "")}` }, children)));
};
exports.DocumentSection = DocumentSection;
DocumentSection.defaultProps = {
    visible: true,
    open: false,
    collapsible: true,
};
//# sourceMappingURL=DocumentSection.js.map