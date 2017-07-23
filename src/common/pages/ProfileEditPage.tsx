import * as React from 'react';
import { connect } from 'react-redux';
import * as ReactRouter from 'react-router';
import { ProfileEditForm } from '../components/ProfileEditForm';
import * as profileEditActions from '../../common/redux/profileEdit/profileEditActions';
import * as commonTypes from '../../common/typings';
import * as ReactRedux from 'react-redux';
import * as ReduxForm from 'redux-form';
import * as httpClient from '../httpClient';
import * as ReactNotificationSystem from 'react-notification-system';
import * as notificationActions from '../../common/redux/notifications/notificationsActions';

interface ProfileEditPageStateOwnProps extends ReactRouter.RouteComponentProps<any> {
    loggedUser: commonTypes.ReduxCurrentUserProfile;
    formValues: any;
}

interface ProfileEditPageDispatchProps {
    profileEditLoadData: () => void;
    enqueueNotification: (notification: ReactNotificationSystem.Notification) => void;
}

interface ProfileEditPageStateProps {

}

declare type ProfileEditPageProps = ProfileEditPageStateProps & ProfileEditPageDispatchProps & ProfileEditPageStateOwnProps;

class ProfileEditPage extends React.Component<ProfileEditPageProps> {

    public componentDidMount() {
        const { profileEditLoadData } = this.props;
        profileEditLoadData();
    }

    private handleFormSubmit = async (values: any) => {
        const { enqueueNotification } = this.props;
        const axiosResult = await httpClient.saveProfileData(values);
        if (axiosResult.data.errors) {
            throw new ReduxForm.SubmissionError(axiosResult.data.errors);
        } else {
            enqueueNotification({
                message: 'Seu perfil foi salvo com sucesso',
                level: 'success',
            });
            this.props.history.push('/');
        }
    }

    private onFormCancel = () => {
        this.props.history.push('/');
    }

    public render() {
        const { formValues } = this.props;

        return (
            <div className="page-wrapper">
                <div className="document-wrapper">
                    <ProfileEditForm onSubmit={this.handleFormSubmit} onCancel={this.onFormCancel} initialValues={formValues} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: commonTypes.ReduxState): ProfileEditPageStateProps => ({
    loggedUser: state.loggedUser,
    formValues: state.form.profileEdit,
});

const mapDispatchToProps = (dispatch: ReactRedux.Dispatch<commonTypes.ReduxState>): ProfileEditPageDispatchProps => ({
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
