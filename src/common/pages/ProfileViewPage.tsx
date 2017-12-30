import * as React from "react";
import * as ReactRedux from "react-redux";
import * as ReactRouter from "react-router";
import * as profileEditActions from "../redux/profileEdit/profileActions";
import { ProfileView } from "../components/ProfileView";
import { LoadState, ProfileState, ReduxState } from "../typings";

interface ProfileViewPageStateProps {
    profileState: ProfileState;
}

interface ProfileViewPageDispatchProps {
    profileViewLoadData: (userName: string) => void;
}

interface ProfileViewPageOwnProps extends ReactRouter.RouteComponentProps<any> {
}

declare type ProfileViewPageProps = ProfileViewPageStateProps & ProfileViewPageDispatchProps & ProfileViewPageOwnProps;

class ProfileViewPage extends React.Component<ProfileViewPageProps> {

    public componentDidMount() {
        const {profileViewLoadData, match: {params: {userName}}} = this.props;
        profileViewLoadData(userName);
    }

    render() {
        const {profileState} = this.props;
        if (profileState.loadState !== LoadState.LOADED) {
            // treat loading and error state here
            return null;
        }
        return (
            <div className="page-wrapper">
                <div className="profile-view-wrapper">
                    <ProfileView profile={profileState.data}/>
                </div>
            </div>
        );
    }
}

// CONNECT

const mapStateToProps = (state: ReduxState): ProfileViewPageStateProps => ({
    profileState: state.profile,
});

const mapDispatchToProps = (dispatch: ReactRedux.Dispatch<any>): ProfileViewPageDispatchProps => ({
    profileViewLoadData: (userName: string) => dispatch(profileEditActions.profileViewLoadData(userName)),
});

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
