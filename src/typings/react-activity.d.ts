
declare module "react-activity" {
    import * as React from 'react';
    interface IActivityProps {
        size: number;
    }
    class Spinner extends React.Component<IActivityProps> {
    }
    class Dots extends React.Component<IActivityProps> {
    }
}
