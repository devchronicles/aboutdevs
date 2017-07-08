import * as React from 'react';

interface FaIconProps {
    icon: string;
    className?: string;
}

const FaIcon: React.SFC<FaIconProps> = (props) => <i className={`fa fa-${props.icon} ${props.className}`} aria-hidden="true" />;

export { FaIcon }
