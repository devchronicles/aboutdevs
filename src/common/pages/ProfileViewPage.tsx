import * as React from "react";
import * as ReactRedux from "react-redux";
import * as ReactRouter from "react-router";

interface ProfileViewPageStateProps {
}

interface ProfileViewPageDispatchProps {

}

interface ProfileViewPageOwnProps extends ReactRouter.RouteComponentProps<any> {
}

declare type ProfileViewPageProps = ProfileViewPageStateProps & ProfileViewPageDispatchProps & ProfileViewPageOwnProps;

class ProfileViewPage extends React.Component<ProfileViewPageProps> {
    render() {
        const {userName} = this.props.match.params;
        return (
            <div>
                ProfileViewPage
            </div>
        );
    }
}

// CONNECT

const mapStateToProps = (state: any): ProfileViewPageStateProps => ({});

const mapDispatchToProps = (dispatch: ReactRedux.Dispatch<any>): ProfileViewPageDispatchProps => ({});

const mergeProps = (stateProps: ProfileViewPageProps, dispatchProps: ProfileViewPageDispatchProps, ownProps: ProfileViewPageOwnProps): ProfileViewPageProps => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
});

const ConnectedProfileViewPage = ReactRedux.connect<ProfileViewPageStateProps, ProfileViewPageDispatchProps, ProfileViewPageOwnProps, ProfileViewPageProps>(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
)(ProfileViewPage);

export { ConnectedProfileViewPage as ProfileViewPage };
