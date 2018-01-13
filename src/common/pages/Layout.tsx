import * as React from "react";
import { connect } from "react-redux";
import { Route, RouteComponentProps, Switch } from "react-router";
import { Header } from "../components/Header";
import { IndexPage } from "./IndexPage";
import { ProfileEditPage } from "./ProfileEditPage";
import { SearchPage } from "./SearchPage";
import * as commonTypes from "../../common/typings";
import * as ReactNotificationSystem from "react-notification-system";
import * as notificationActions from "../../common/redux/notifications/notificationsActions";
import { Dispatch } from "redux";
import { ProfileViewPage } from "./ProfileViewPage";

interface LayoutStateProps {
    loggedUser: commonTypes.CurrentUserProfile;
    notifications: ReactNotificationSystem.Notification[];
}

interface LayoutDispatchProps {
    dequeueNotification: () => void;
}

interface LayoutOwnProps extends RouteComponentProps<any> {

}

declare type LayoutProps = LayoutStateProps & LayoutDispatchProps & LayoutOwnProps;

class Layout extends React.Component<LayoutProps> {
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
                    <Route path="/s/t/:tags/l/:googlePlaceId/:placeString" component={SearchPage}/>
                    <Route exact={true} path="/:userName" component={ProfileViewPage}/>
                    <Route exact={true} path="/" component={IndexPage} />
                </Switch>
                <ReactNotificationSystem ref={this.setNotificationSystemRef} />
            </div>
        );
    }
}

// CONNECT

const mapStateToProps = (state: commonTypes.ReduxState): LayoutStateProps => ({
    loggedUser: state.loggedUser,
    notifications: state.notifications,
});

const mapDispatchToProps = (dispatch: Dispatch<commonTypes.ReduxState>): LayoutDispatchProps => ({
    dequeueNotification: () => dispatch(notificationActions.dequeueNotification()),
});

const mergeProps = (stateProps: LayoutStateProps, dispatchProps: LayoutDispatchProps, ownProps: LayoutOwnProps): LayoutProps => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
});

const ConnectedApp = connect<LayoutStateProps, LayoutDispatchProps, LayoutOwnProps, LayoutProps>(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
)(Layout);

export { ConnectedApp as Layout };
