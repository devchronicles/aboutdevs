"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const react_router_1 = require("react-router");
const Header_1 = require("../components/Header");
const IndexPage_1 = require("./IndexPage");
const ProfileEditPage_1 = require("./ProfileEditPage");
const SearchPage_1 = require("./SearchPage");
const ReactNotificationSystem = require("react-notification-system");
const notificationActions = require("../../common/redux/notifications/notificationsActions");
const ProfileViewPage_1 = require("./ProfileViewPage");
const DocsPage_1 = require("./DocsPage");
class Layout extends React.Component {
    constructor() {
        super(...arguments);
        this.setNotificationSystemRef = (ref) => {
            this.notificationSystem = ref;
        };
    }
    componentDidUpdate() {
        const { dequeueNotification, notifications } = this.props;
        if (notifications && notifications.length) {
            this.notificationSystem.addNotification(notifications[0]);
            dequeueNotification();
        }
    }
    render() {
        const { loggedUser } = this.props;
        return (React.createElement("div", { className: "container" },
            React.createElement(Header_1.Header, { loggedUser: loggedUser }),
            React.createElement(react_router_1.Switch, null,
                React.createElement(react_router_1.Route, { exact: true, path: "/d/docs", component: DocsPage_1.DocsPage }),
                React.createElement(react_router_1.Route, { exact: true, path: "/search", component: SearchPage_1.SearchPage }),
                React.createElement(react_router_1.Route, { exact: true, path: "/config/edituserprofile", component: ProfileEditPage_1.ProfileEditPage }),
                React.createElement(react_router_1.Route, { path: "/s/t/:tags/l/:googlePlaceId/:placeString", component: SearchPage_1.SearchPage }),
                React.createElement(react_router_1.Route, { exact: true, path: "/:userName", component: ProfileViewPage_1.ProfileViewPage }),
                React.createElement(react_router_1.Route, { exact: true, path: "/", component: IndexPage_1.IndexPage })),
            React.createElement(ReactNotificationSystem, { ref: this.setNotificationSystemRef })));
    }
}
// CONNECT
const mapStateToProps = (state) => ({
    loggedUser: state.loggedUser,
    notifications: state.notifications,
});
const mapDispatchToProps = (dispatch) => ({
    dequeueNotification: () => dispatch(notificationActions.dequeueNotification()),
});
const mergeProps = (stateProps, dispatchProps, ownProps) => (Object.assign({}, stateProps, dispatchProps, ownProps));
const ConnectedApp = react_redux_1.connect(mapStateToProps, mapDispatchToProps, mergeProps)(Layout);
exports.Layout = ConnectedApp;
//# sourceMappingURL=Layout.js.map