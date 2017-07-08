import * as ReduxForm from 'redux-form';
import * as commonTypes from '../../common/typings';

export interface ReduxState {
    loggedUser: commonTypes.ReduxCurrentUserProfile;
    form: {
        profileEdit?: any,
    };
}
