import * as React from "react";
import * as commonTypes from "../../common/typings";
import * as ReactRedux from "react-redux";
import { ProfileList } from "./ProfileList";
import * as searchActions from "../redux/search/searchActions";
import { getDataFromFormattedAddress } from "../helpers/locationFormatHelper";
import { SearchState } from "../typings";
import { areArraysEqual } from "../helpers/arrayHelper";

interface SearchResultStateProps {
    searchState: SearchState;
}

interface SearchResultDispatchProps {
    loadSearchResults: (tags: string[], formattedAddress: string) => void;
}

interface SearchResultOwnProps {
    formattedAddress?: string;
    tags?: string[];
}

declare type SearchResultProps = SearchResultStateProps & SearchResultDispatchProps & SearchResultOwnProps;

class SearchResult extends React.Component <SearchResultProps> {

    reloadResults() {
        const {loadSearchResults, tags, formattedAddress} = this.props;
        loadSearchResults(tags, formattedAddress);
    }

    componentDidMount() {
        this.reloadResults();
    }

    componentDidUpdate(prevProps: SearchResultProps) {
        const {tags, formattedAddress} = this.props;
        if (!areArraysEqual(prevProps.tags, tags) || prevProps.formattedAddress !== formattedAddress) {
            this.reloadResults();
        }
    }

    public render() {
        const {searchState, formattedAddress, tags} = this.props;

        const tagComponents = (!tags || tags.length === 0) ? null : tags.map((tagName, i) => (
            <span
                className="tag"
                key={`tag-${i}`}
            >
                {tagName}
            </span>
        ));

        let locationComponent: React.ReactNode;
        if (formattedAddress) {
            const {address} = getDataFromFormattedAddress(formattedAddress);
            locationComponent = (
                <span>
                    <span> near</span>
                    <i className={"fa fa-map-marker"}/>
                    <span className="location">{address}</span>
                </span>
            );
        } else {
            locationComponent = null;
        }

        let headerComponent: React.ReactNode;
        if (tagComponents || locationComponent) {
            headerComponent = (
                <>
                    {tagComponents}
                    <span className="developers-near">developers</span>
                    {locationComponent}
                </>
            );
        } else {
            headerComponent = <span>Last registered developers</span>;
        }

        return (
            <ul className="search-result">
                <div className="search-result-header">
                    {headerComponent}
                </div>
                <ProfileList searchState={searchState}/>
            </ul>
        );
    }
}

const mapStateToProps = (state: commonTypes.ReduxState): SearchResultStateProps => ({
    searchState: state.search,
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
