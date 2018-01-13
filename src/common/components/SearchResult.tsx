import * as React from "react";
import * as commonTypes from "../../common/typings";
import * as ReactRedux from "react-redux";
import { ProfileList } from "./ProfileList";
import * as searchActions from "../redux/search/searchActions";
import { distillTagsParameter } from "../../server/helpers/tagHelper";

interface SearchResultStateProps {
    searchResultProfiles: commonTypes.DeveloperSearchProfile[];
}

interface SearchResultDispatchProps {
    loadSearchResults: (tags: string[], formattedAddress: string) => void;
}

interface SearchResultOwnProps {
    formattedAddress: string;
    tags: string;
}

declare type SearchResultProps = SearchResultStateProps & SearchResultDispatchProps & SearchResultOwnProps;

class SearchResult extends React.Component <SearchResultProps> {

    reloadResults() {
        const {loadSearchResults, tags, formattedAddress} = this.props;
        const tagsDistilled = distillTagsParameter(tags);
        loadSearchResults(tagsDistilled, formattedAddress);
    }

    componentDidMount() {
        this.reloadResults();
    }

    componentDidUpdate(prevProps: SearchResultProps) {
        const {tags, formattedAddress} = this.props;
        if (prevProps.tags !== tags || prevProps.formattedAddress !== formattedAddress) {
            this.reloadResults();
        }
    }

    public render() {
        const {searchResultProfiles, formattedAddress, tags} = this.props;
        const tagsText = distillTagsParameter(tags).join(", ");
        return (
            <ul className="search-result">
                <div className="search-result-header">
                    <span className="display">
                        {tagsText} developers in {formattedAddress}
                    </span>
                </div>
                <ProfileList profiles={searchResultProfiles}/>
            </ul>
        );
    }
}

const mapStateToProps = (state: commonTypes.ReduxState): SearchResultStateProps => ({
    searchResultProfiles: state.search.profiles,
});

const mapDispatchToProps = (dispatch: ReactRedux.Dispatch<commonTypes.ReduxState>): SearchResultDispatchProps => ({
    loadSearchResults: (tags: string[], formattedAddress: string) => dispatch(searchActions.searchLoad(tags, formattedAddress)),
});

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

export { ConnectedSearchResult as SearchResult };
