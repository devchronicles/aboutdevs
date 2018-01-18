import * as React from "react";
import { connect } from "react-redux";
import * as ReactRouter from "react-router";
import { ProfileEditForm } from "../components/ProfileEditForm";
import * as profileEditActions from "../redux/profileEdit/profileActions";
import * as loggedUserActions from "../redux/loggedUser/loggedUserActions";
import * as commonTypes from "../../common/typings";
import * as ReduxForm from "redux-form";
import * as httpClient from "../httpClient";
import * as ReactNotificationSystem from "react-notification-system";
import * as notificationActions from "../../common/redux/notifications/notificationsActions";
import { Dispatch } from "redux";
import { ProfileView } from "../components/ProfileView";
import { getHomeUrl } from "../../server/helpers/routeHelper";

interface ProfileEditPageStateOwnProps extends ReactRouter.RouteComponentProps<any> {
    loggedUser: commonTypes.CurrentUserProfile;
    formValues: any;
}

interface ProfileEditPageDispatchProps {
    profileEditLoadData: () => void;
    activateLoggedUser: () => void;
    enqueueNotification: (notification: ReactNotificationSystem.Notification) => void;
}

interface ProfileEditPageStateProps {

}

declare type ProfileEditPageProps =
    ProfileEditPageStateProps
    & ProfileEditPageDispatchProps
    & ProfileEditPageStateOwnProps;

class ProfileEditPage extends React.Component<ProfileEditPageProps> {

    private handleFormSubmit = async (values: any) => {
        const {enqueueNotification, activateLoggedUser, loggedUser} = this.props;
        enqueueNotification({
            message: "Saving your profile...",
            level: "info",
        });
        const axiosResult = await httpClient.saveProfileData(values);
        if (axiosResult.data.errors) {
            throw new ReduxForm.SubmissionError(axiosResult.data.errors);
        } else {
            enqueueNotification({
                message: "Your profile has been saved",
                level: "success",
            });
            if (loggedUser.activated === false) {
                activateLoggedUser();
            }
        }
    }

    private handleFormSubmitFailed = async (errors: any) => {
        const {enqueueNotification} = this.props;
        enqueueNotification({
            message: `Your profile could not be saved due to validation errors. Please review your profile.`,
            level: "error",
        });
    }

    public componentDidMount() {
        const {profileEditLoadData, loggedUser, history} = this.props;
        if (!loggedUser || !loggedUser.id) {
            history.push(getHomeUrl());
            return;
        }
        profileEditLoadData();
    }

    private onFormCancel = () => {
        const {loggedUser} = this.props;
        this.props.history.push(`/${loggedUser.name}`);
    }

    public render() {
        const {formValues} = this.props;

        return (
            <div className="page-wrapper">
                <div className="profile-edit-page-wrapper">
                    <div className="profile-edit-view-wrapper">
                        <ProfileView profile={formValues}/>
                    </div>
                    <div className="profile-edit-wrapper">
                        <ProfileEditForm
                            onSubmit={this.handleFormSubmit}
                            onSubmitFail={this.handleFormSubmitFailed}
                            onCancel={this.onFormCancel}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: commonTypes.ReduxState): ProfileEditPageStateProps => ({
    loggedUser: state.loggedUser,
    formValues: state.form.profileEdit ? state.form.profileEdit.values : null,
});

const mapDispatchToProps = (dispatch: Dispatch<commonTypes.ReduxState>): ProfileEditPageDispatchProps => ({
    profileEditLoadData: () => dispatch(profileEditActions.profileEditLoadData()),
    activateLoggedUser: () => dispatch(loggedUserActions.activateLoggedUser()),
    enqueueNotification: (notification: ReactNotificationSystem.Notification) => dispatch(notificationActions.enqueueNotification(notification)),
});

const mergeProps = (stateProps: ProfileEditPageStateProps, dispatchProps: ProfileEditPageDispatchProps, ownProps: ProfileEditPageStateOwnProps): ProfileEditPageProps => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
});

// CONNECT
const ConnectedProfileEditPage = connect<ProfileEditPageStateProps, ProfileEditPageDispatchProps, ProfileEditPageStateOwnProps, ProfileEditPageProps>(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
)(ProfileEditPage);

export { ConnectedProfileEditPage as ProfileEditPage };
