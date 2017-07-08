import * as React from 'react';
import { connect } from 'react-redux';
import * as ReactRouter from 'react-router';
import { ProfileEditForm } from '../components/ProfileEditForm';
import * as profileEditActions from '../redux/profileEdit/profileEditActions';
import * as clientTypes from '../typings';
import * as commonTypes from '../../common/typings';
import * as ReactRedux from 'react-redux';
import * as httpClient from '../httpClient';

interface IProfileEditPageStateOwnProps extends ReactRouter.RouteComponentProps<any> {
    loggedUser: commonTypes.ReduxCurrentUserProfile;
    formValues: any;
}

interface IProfileEditPageDispatchProps {
    actions: any;
}

interface IProfileEditPageStateProps {

}

declare type IProfileEditPageProps = IProfileEditPageStateProps & IProfileEditPageDispatchProps & IProfileEditPageStateOwnProps;

class ProfileEditPage extends React.Component<IProfileEditPageProps> {

    constructor(props: IProfileEditPageProps) {
        super(props);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    componentDidMount() {
        const { actions } = this.props;
        actions.profileEditLoadData();
    }

    onFormSubmit(values: any) {
        httpClient.saveProfileData(values)
            .then((r) => {
                console.log(r);
            });
    }

    render() {
        const { loggedUser, formValues } = this.props;

        return (<div className="page-wrapper">
            <div className="document-wrapper">
                <ProfileEditForm onSubmit={this.onFormSubmit} initialValues={formValues} />
            </div>
        </div>);
    }
}

const mapStateToProps = (state: clientTypes.ReduxState): IProfileEditPageStateProps => ({
    loggedUser: state.loggedUser,
    formValues: state.form.profileEdit
});

const mapDispatchToProps = (dispatch: ReactRedux.Dispatch<clientTypes.ReduxState>): IProfileEditPageDispatchProps => ({
    actions: {
        profileEditLoadData: () => { dispatch(profileEditActions.profileEditLoadData()); }
    }
});

const mergeProps = (stateProps: IProfileEditPageStateProps, dispatchProps: IProfileEditPageDispatchProps, ownProps: IProfileEditPageStateOwnProps): IProfileEditPageProps => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps
});

// CONNECT
const ConnectedProfileEditPage = connect<IProfileEditPageStateProps, IProfileEditPageDispatchProps, IProfileEditPageStateOwnProps, IProfileEditPageProps>(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
)(ProfileEditPage);

export { ConnectedProfileEditPage as ProfileEditPage }