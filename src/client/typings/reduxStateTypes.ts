import * as ReduxForm from 'redux-form';
import * as commonTypes from '../../common/typings';
import * as ReactNotificationSystem from 'react-notification-system';

export interface ReduxState {
    loggedUser: commonTypes.ReduxCurrentUserProfile;
    form: {
        profileEdit?: any,
    };
    notifications: ReactNotificationSystem.Notification[];
}
