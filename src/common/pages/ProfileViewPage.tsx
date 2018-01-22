import * as React from "react";
import * as ReactRedux from "react-redux";
import * as ReactRouter from "react-router";
import * as profileActions from "../redux/profileEdit/profileActions";
import { ProfileView } from "../components/ProfileView";
import { LoadState, ProfileState, ReduxState } from "../typings";
import { getPageTitleDefault, getPageTitleForProfile } from "../helpers/pageTitleHelper";

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
        if (typeof document !== "undefined") {
            document.title = getPageTitleDefault();
        }
    }

    public componentDidUpdate() {
        const {profileState} = this.props;
        if (typeof document !== "undefined" && profileState && profileState.data && profileState.data.displayName) {
            document.title = getPageTitleForProfile(profileState.data.displayName);
        }
    }

    render() {
        const {profileState} = this.props;
        if (profileState.loadState !== LoadState.LOADED) {
            // treat loading and error state here
            return null;
        }
        return (
            <div className="page-wrapper">
                <ProfileView profile={profileState.data}/>
            </div>
        );
    }
}

// CONNECT

const mapStateToProps = (state: ReduxState): ProfileViewPageStateProps => ({
    profileState: state.profile,
});

const mapDispatchToProps = (dispatch: ReactRedux.Dispatch<any>): ProfileViewPageDispatchProps => ({
    profileViewLoadData: (userName: string) => dispatch(profileActions.profileViewLoadData(userName)),
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
