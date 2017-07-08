import * as commonTypes from '../../common/typings'
import * as ReduxForm from 'redux-form';

export interface ReduxState {
    loggedUser: commonTypes.ReduxCurrentUserProfile,
    form: {
        profileEdit?: any
    }
}