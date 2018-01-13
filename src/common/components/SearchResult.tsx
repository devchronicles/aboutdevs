import * as React from "react";
import * as commonTypes from "../../common/typings";
import * as ReactRedux from "react-redux";
import { ProfileList } from "./ProfileList";

interface SearchResultStateProps {
    searchResultProfiles: commonTypes.DeveloperSearchProfile[];
}

interface SearchResultDispatchProps {

}

interface SearchResultOwnProps {
    address: string;
    tags: string[];
}

declare type SearchResultProps = SearchResultStateProps & SearchResultDispatchProps & SearchResultOwnProps;

class SearchResult extends React.Component <SearchResultProps> {
    public render() {
        const {searchResultProfiles, address, tags} = this.props;
        const tagsText = tags.join(", ");
        return (
            <ul className="search-result">
                <div className="search-result-header">
                    <span className="display">
                        {tagsText} developers in {address}
                    </span>
                </div>
                <ProfileList profiles={searchResultProfiles} />
            </ul>
        );
    }
}

const mapStateToProps = (state: commonTypes.ReduxState): SearchResultStateProps => ({
    searchResultProfiles: state.search.result.profiles,
});

const mapDispatchToProps = (dispatch: ReactRedux.Dispatch<commonTypes.ReduxState>): SearchResultDispatchProps => ({});

const mergeProps = (stateProps: SearchResultProps, dispatchProps: SearchResultDispatchProps, ownProps: SearchResultOwnProps): SearchResultProps => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
});

const ConnectedSearchResult = ReactRedux.connect<SearchResultStateProps, SearchResultDispatchProps, SearchResultOwnProps, SearchResultProps>(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
)(SearchResult);

export {ConnectedSearchResult as SearchResult};
