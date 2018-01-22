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
import { DocsPage } from "./DocsPage";
import { NotFoundPage } from "./NotFoundPage";

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
        const {dequeueNotification, notifications} = this.props;
        if (notifications && notifications.length) {
            this.notificationSystem.addNotification(notifications[0]);
            dequeueNotification();
        }
    }

    public render() {
        const {loggedUser} = this.props;

        const notificationStyles = {
            NotificationItem: { // Override the notification item
                DefaultStyle: { // Applied to every notification, regardless of the notification level
                    fontSize: "16px",
                    padding: "16px",
                },
            },
        };

        return (
            <>
                <Header loggedUser={loggedUser}/>
                <div className="page-body">
                    <Switch>
                        <Route exact={true} path="/404" component={NotFoundPage}/>
                        <Route exact={true} path="/d/docs" component={DocsPage}/>
                        <Route exact={true} path="/c/edituserprofile" component={ProfileEditPage}/>
                        <Route exact={true} path="/" component={IndexPage}/>
                        <Route path="/s/t/:tags/l/:googlePlaceId/:placeString" component={SearchPage}/>
                        <Route exact={true} path="/:userName" component={ProfileViewPage}/>
                        <Route component={NotFoundPage}/>
                    </Switch>
                    <ReactNotificationSystem ref={this.setNotificationSystemRef} style={notificationStyles}/>
                </div>
            </>
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
