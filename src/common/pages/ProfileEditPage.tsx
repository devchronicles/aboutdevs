import * as React from "react";
import { connect } from "react-redux";
import * as ReactRouter from "react-router";
import { ProfileEditForm } from "../components/ProfileEditForm";
import * as profileEditActions from "../../common/redux/profileEdit/profileEditActions";
import * as commonTypes from "../../common/typings";
import * as ReduxForm from "redux-form";
import * as httpClient from "../httpClient";
import * as ReactNotificationSystem from "react-notification-system";
import * as notificationActions from "../../common/redux/notifications/notificationsActions";
import { Dispatch } from "redux";
import { ProfileView } from "../components/ProfileView";

interface ProfileEditPageStateOwnProps extends ReactRouter.RouteComponentProps<any> {
    loggedUser: commonTypes.CurrentUserProfile;
    formValues: any;
}

interface ProfileEditPageDispatchProps {
    profileEditLoadData: () => void;
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
        const {enqueueNotification} = this.props;
        const axiosResult = await httpClient.saveProfileData(values);
        if (axiosResult.data.errors) {
            throw new ReduxForm.SubmissionError(axiosResult.data.errors);
        } else {
            enqueueNotification({
                message: "Your profile has been saved",
                level: "success",
            });
            // this.props.history.push("/");
        }
    }

    private handleFormSubmitFailed = async (errors: any) => {
        const {enqueueNotification} = this.props;
        enqueueNotification({
            message: `Cannot submit form. ${Object.keys(errors).length} fields have validation errors.`,
            level: "error",
        });
    }

    public componentDidMount() {
        const {profileEditLoadData} = this.props;
        profileEditLoadData();
    }

    private onFormCancel = () => {
        this.props.history.push("/");
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
