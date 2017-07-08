import * as commonTypes from '../../common/typings'

export interface IReduxState {
    loggedUser: commonTypes.IReduxCurrentUserProfile,
    form: any
}