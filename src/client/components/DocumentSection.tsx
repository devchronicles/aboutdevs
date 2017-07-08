import * as React from 'react';

interface DocumentSectionProps {
    className: string;
    visible?: boolean;
    children: string | JSX.Element | JSX.Element[];
}

const DocumentSection: React.SFC<DocumentSectionProps> = ({ className, visible, children }) => {
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
