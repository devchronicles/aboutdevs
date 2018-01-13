import * as React from "react";
import { connect } from "react-redux";
import * as ReactRouter from "react-router";
import * as searchActions from "../redux/search/searchActions";
import * as commonTypes from "../typings/commonTypes";

import { SearchForm } from "../components/IndexSearchForm";
import { SearchResult } from "../components/SearchResult";
import { Dispatch } from "redux";
import { getDeveloperSearchUrl } from "../../server/helpers/routeHelper";
import { SearchRouteType } from "../typings/routeTypes";
import { distillTagsParameter } from "../../server/helpers/tagHelper";
import { formatAddress } from "../helpers/googlePlacesFormatHelper";

interface SearchPageStateProps {
    searchCriteria: commonTypes.SearchCriteria;
}

interface SearchPageDispatchProps {
    loadSearchResults: (tags: string[], formattedAddress: string) => void;
}

interface SearchPageOwnProps extends ReactRouter.RouteComponentProps<SearchRouteType> {

}

declare type SearchPageProps = SearchPageStateProps & SearchPageDispatchProps & SearchPageOwnProps;

class SearchPage extends React.Component<SearchPageProps> {

    private handleFormSubmit = (formValues: any) => {
        const {loadSearchResults} = this.props;
        const {tags, formattedAddress} = formValues;

        this.props.history.push(getDeveloperSearchUrl(tags, formattedAddress));
        loadSearchResults(tags, formattedAddress);
    }

    public componentDidMount() {
        const {loadSearchResults} = this.props;
        const {tags, googlePlaceId, placeString} = this.props.match.params;
        const tagsDistilled = distillTagsParameter(tags);
        const formattedAddress = formatAddress(googlePlaceId, placeString);
        loadSearchResults(tagsDistilled, formattedAddress);
    }

    public render() {
        const {searchCriteria} = this.props;
        const {tags, placeString} = this.props.match.params;
        const tagsDistilled = distillTagsParameter(tags);

        return (
            <div className="page-wrapper">
                <div className="search-criteria-wrapper">
                    <div className="search-criteria">
                        <SearchForm onSubmit={this.handleFormSubmit} initialValues={searchCriteria}/>
                    </div>
                </div>
                <SearchResult tags={tagsDistilled} address={placeString}/>
            </div>
        );
    }
}

// CONNECT

const mapStateToProps = (state: commonTypes.ReduxState): SearchPageStateProps => ({
    searchCriteria: state.search.criteria,
});

const mapDispatchToProps = (dispatch: Dispatch<commonTypes.ReduxState>): SearchPageDispatchProps => ({
    loadSearchResults: (tags: string[], formattedAddress: string) => dispatch(searchActions.searchLoad(tags, formattedAddress)),
});

const mergeProps = (stateProps: SearchPageStateProps, dispatchProps: SearchPageDispatchProps, ownProps: SearchPageOwnProps): SearchPageProps => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
});

const ConnectedSearchPage = connect<SearchPageStateProps, SearchPageDispatchProps, SearchPageOwnProps, SearchPageProps>(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
)(SearchPage);

export { ConnectedSearchPage as SearchPage };
