import * as React from "react";
import { connect, Dispatch } from "react-redux";
import * as ReactRouter from "react-router";
import * as clientTypes from "../typings";
import { IndexSearchFormWrapper } from "../components/IndexSearchFormWrapper";
import { getDeveloperSearchUrl } from "../../server/helpers/routeHelper";

interface IndexPageStateProps {
    loggedUser: clientTypes.CurrentUserProfile;
}

interface IndexPageDispatchProps {

}

interface IndexPageOwnProps extends ReactRouter.RouteComponentProps<any> {

}

declare type IndexPageProps = IndexPageStateProps & IndexPageDispatchProps & IndexPageOwnProps;

class IndexPage extends React.Component<IndexPageProps> {

    public handleSearchSubmit = (formValues: any) => {
        const {searchTags, searchFormattedAddress} = formValues;
        this.props.history.push(getDeveloperSearchUrl(searchTags, searchFormattedAddress));
    }

    public render() {
        const {loggedUser} = this.props;
        return (
            <div className="page-wrapper">
                <div className="index-page-wrapper background-page-wrapper">
                    <IndexSearchFormWrapper
                        handleSearchSubmit={this.handleSearchSubmit}
                        displayRegisterWrapper={!loggedUser.id}
                    />
                </div>
            </div>);
    }
}

// CONNECT

const mapStateToProps = (state: clientTypes.ReduxState): IndexPageStateProps => ({
    loggedUser: state.loggedUser,
});

const mapDispatchToProps = (dispatch: Dispatch<clientTypes.ReduxState>): IndexPageDispatchProps => ({});

const mergeProps = (stateProps: IndexPageStateProps, dispatchProps: IndexPageDispatchProps, ownProps: IndexPageOwnProps): IndexPageProps => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
});

const ConnectedIndexPage = connect<IndexPageStateProps, IndexPageDispatchProps, IndexPageOwnProps, IndexPageProps>(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
)(IndexPage);

export { ConnectedIndexPage as IndexPage };
