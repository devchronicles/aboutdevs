import * as React from 'react';

interface IFaIconProps {
    icon: string;
    className?: string;
}

const FaIcon: React.SFC<IFaIconProps> = (props) => <i className={`fa fa-${props.icon} ${props.className}`} aria-hidden="true" />;

export { FaIcon }
