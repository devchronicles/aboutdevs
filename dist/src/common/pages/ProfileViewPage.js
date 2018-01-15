"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ReactRedux = require("react-redux");
const profileActions = require("../redux/profileEdit/profileActions");
const ProfileView_1 = require("../components/ProfileView");
const typings_1 = require("../typings");
class ProfileViewPage extends React.Component {
    componentDidMount() {
        const { profileViewLoadData, match: { params: { userName } } } = this.props;
        profileViewLoadData(userName);
    }
    render() {
        const { profileState } = this.props;
        if (profileState.loadState !== typings_1.LoadState.LOADED) {
            // treat loading and error state here
            return null;
        }
        return (React.createElement("div", { className: "page-wrapper" },
            React.createElement("div", { className: "profile-view-wrapper" },
                React.createElement(ProfileView_1.ProfileView, { profile: profileState.data }))));
    }
}
// CONNECT
const mapStateToProps = (state) => ({
    profileState: state.profile,
});
const mapDispatchToProps = (dispatch) => ({
    profileViewLoadData: (userName) => dispatch(profileActions.profileViewLoadData(userName)),
});
const mergeProps = (stateProps, dispatchProps, ownProps) => (Object.assign({}, stateProps, dispatchProps, ownProps));
const ConnectedProfileViewPage = ReactRedux.connect(mapStateToProps, mapDispatchToProps, mergeProps)(ProfileViewPage);
exports.ProfileViewPage = ConnectedProfileViewPage;
//# sourceMappingURL=ProfileViewPage.js.map