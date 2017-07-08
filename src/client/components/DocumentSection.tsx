import * as React from 'react';

interface IDocumentSectionProps {
    className: string;
    visible: boolean;
    children: string | JSX.Element | JSX.Element[];
}

const DocumentSection: React.SFC<IDocumentSectionProps> = ({ className, visible, children }) => {
    const finalClassName = !visible ? className += ' hidden' : className;
    return (
        <div className={`document-section ${finalClassName}`}>
            {children}
        </div>
    );
};

DocumentSection.defaultProps = {
    visible: true,
};

export { DocumentSection }
