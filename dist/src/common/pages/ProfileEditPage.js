"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const ProfileEditForm_1 = require("../components/ProfileEditForm");
const profileEditActions = require("../redux/profileEdit/profileActions");
const ReduxForm = require("redux-form");
const httpClient = require("../httpClient");
const notificationActions = require("../../common/redux/notifications/notificationsActions");
const ProfileView_1 = require("../components/ProfileView");
class ProfileEditPage extends React.Component {
    constructor() {
        super(...arguments);
        this.handleFormSubmit = (values) => __awaiter(this, void 0, void 0, function* () {
            const { enqueueNotification } = this.props;
            const axiosResult = yield httpClient.saveProfileData(values);
            if (axiosResult.data.errors) {
                throw new ReduxForm.SubmissionError(axiosResult.data.errors);
            }
            else {
                enqueueNotification({
                    message: "Your profile has been saved",
                    level: "success",
                });
                // this.props.history.push("/");
            }
        });
        this.handleFormSubmitFailed = (errors) => __awaiter(this, void 0, void 0, function* () {
            const { enqueueNotification } = this.props;
            enqueueNotification({
                message: `Your profile was not saved due to validation errors.`,
                level: "error",
            });
        });
        this.onFormCancel = () => {
            const { loggedUser } = this.props;
            this.props.history.push(`/${loggedUser.name}`);
        };
    }
    componentDidMount() {
        const { profileEditLoadData } = this.props;
        profileEditLoadData();
    }
    render() {
        const { formValues } = this.props;
        return (React.createElement("div", { className: "page-wrapper" },
            React.createElement("div", { className: "profile-edit-page-wrapper" },
                React.createElement("div", { className: "profile-edit-view-wrapper" },
                    React.createElement(ProfileView_1.ProfileView, { profile: formValues })),
                React.createElement("div", { className: "profile-edit-wrapper" },
                    React.createElement(ProfileEditForm_1.ProfileEditForm, { onSubmit: this.handleFormSubmit, onSubmitFail: this.handleFormSubmitFailed, onCancel: this.onFormCancel })))));
    }
}
const mapStateToProps = (state) => ({
    loggedUser: state.loggedUser,
    formValues: state.form.profileEdit ? state.form.profileEdit.values : null,
});
const mapDispatchToProps = (dispatch) => ({
    profileEditLoadData: () => dispatch(profileEditActions.profileEditLoadData()),
    enqueueNotification: (notification) => dispatch(notificationActions.enqueueNotification(notification)),
});
const mergeProps = (stateProps, dispatchProps, ownProps) => (Object.assign({}, stateProps, dispatchProps, ownProps));
// CONNECT
const ConnectedProfileEditPage = react_redux_1.connect(mapStateToProps, mapDispatchToProps, mergeProps)(ProfileEditPage);
exports.ProfileEditPage = ConnectedProfileEditPage;
//# sourceMappingURL=ProfileEditPage.js.map