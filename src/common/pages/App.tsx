import * as React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';
import { Header } from '../components/Header';
import { IndexPage } from './IndexPage';
import { ProfileEditPage } from './ProfileEditPage';
import { SearchPage } from './SearchPage';
import * as commonTypes from '../../common/typings';
import * as ReactRedux from 'react-redux';
import * as ReactRouter from 'react-router';
import * as ReactNotificationSystem from 'react-notification-system';
import * as notificationActions from '../../common/redux/notifications/notificationsActions';

interface AppStateProps {
    loggedUser: commonTypes.ReduxCurrentUserProfile;
    notifications: ReactNotificationSystem.Notification[];
}

interface AppDispatchProps {
    dequeueNotification: () => void;
}

interface AppOwnProps extends ReactRouter.RouteComponentProps<any> {

}

declare type AppProps = AppStateProps & AppDispatchProps & AppOwnProps;

class App extends React.Component<AppProps> {
    private notificationSystem: ReactNotificationSystem.System;

    private setNotificationSystemRef = (ref: ReactNotificationSystem.System) => {
        this.notificationSystem = ref;
    }

    public componentDidUpdate() {
        const { dequeueNotification, notifications } = this.props;
        if (notifications && notifications.length) {
            this.notificationSystem.addNotification(notifications[0]);
            dequeueNotification();
        }
    }

    public render() {
        const { loggedUser } = this.props;
        return (
            <div className="container">
                <Header loggedUser={loggedUser} />
                <Switch>
                    <Route exact={true} path="/search" component={SearchPage} />
                    <Route exact={true} path="/config/edituserprofile" component={ProfileEditPage} />
                    <Route path="/s/:location/:professional" component={SearchPage} />
                    <Route exact={true} path="/" component={IndexPage} />
                </Switch>
                <ReactNotificationSystem ref={this.setNotificationSystemRef} />
            </div>
        );
    }
}

// CONNECT

const mapStateToProps = (state: commonTypes.ReduxState): AppStateProps => ({
    loggedUser: state.loggedUser,
    notifications: state.notifications,
});

const mapDispatchToProps = (dispatch: ReactRedux.Dispatch<commonTypes.ReduxState>): AppDispatchProps => ({
    dequeueNotification: () => dispatch(notificationActions.dequeueNotification()),
});

const mergeProps = (stateProps: AppStateProps, dispatchProps: AppDispatchProps, ownProps: AppOwnProps): AppProps => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
});

const ConnectedApp = connect<AppStateProps, AppDispatchProps, AppOwnProps, AppProps>(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
)(App);

export { ConnectedApp as App };
