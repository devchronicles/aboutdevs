import * as React from "react";

interface DocumentSectionProps {
    id: string;
    className?: string;
    visible?: boolean;
    open?: boolean;
    title?: string;
    collapsible?: boolean;
    onToggleCollapsed?: (id: string) => void;
}

function getIcon(open: boolean) {
    return open
        ? <i className="fa fa-chevron-down" aria-hidden="true"/>
        : <i className="fa fa-chevron-right" aria-hidden="true"/>;
}

const DocumentSection: React.SFC<DocumentSectionProps> = ({id, className, visible, open, title, collapsible, onToggleCollapsed, children}) => {
    return (
        <section className={`document-section ${className} ${!visible ? "hidden" : ""}`}>
            {title && <p className="section-title" onClick={() => onToggleCollapsed ? onToggleCollapsed(id) : false}>
                {getIcon(open)}
                <span>{title}</span>
            </p>}
            <div className={`section-body ${(collapsible && !open ? "hidden" : "")}`}>
                {children}
            </div>
        </section>
    );
};

DocumentSection.defaultProps = {
    visible: true,
    open: false,
    collapsible: true,
};

export { DocumentSection };
