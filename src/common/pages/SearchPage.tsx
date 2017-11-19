import * as React from 'react';
import { connect } from 'react-redux';
import * as ReactRouter from 'react-router';
import * as searchActions from '../redux/search/searchActions';
import * as commonTypes from '../typings/commonTypes';
import * as gisHelper from '../helpers/gisHelper';
import * as urlHelper from '../helpers/urlHelper';

import {SearchForm} from '../components/SearchForm';
import {SearchResult} from '../components/SearchResult';
import { Dispatch } from 'redux';

interface SearchPageStateProps {
    searchCriteria: commonTypes.SearchCriteria;
}

interface SearchPageDispatchProps {
    loadSearchCriteria: (search: string, location: string) => void;
    loadSearchResults: (search: string, location: string, display: commonTypes.SearchDisplay) => void;
}

interface SearchPageOwnProps extends ReactRouter.RouteComponentProps<{ search: string, location: string, display: string }> {

}

declare type SearchPageProps = SearchPageStateProps & SearchPageDispatchProps & SearchPageOwnProps;

class SearchPage extends React.Component<SearchPageProps> {

    public componentDidMount() {
        const {loadSearchCriteria, loadSearchResults} = this.props;
        const {search, location, display } = this.props.match.params;
        loadSearchCriteria(search, location);
        loadSearchResults(search, location, commonTypes.SearchDisplay.ORDER_BY_DISTANCE);
    }

    private handleFormSubmit = (formValues: any) => {
        const {loadSearchCriteria, loadSearchResults} = this.props;
        const {search, location} = formValues;

        // let's try to see if the entered location is a latitude longitude pair
        const geoLocation = gisHelper.extractLocationFromText(location);

        const normalizedLocation = geoLocation
            ? gisHelper.buildUrlParameterFromLocation(geoLocation)
            : urlHelper.normalizeUrlParameter(location);
        const normalizedSearch = urlHelper.normalizeUrlParameter(search);

        if (search && location) {
            this.props.history.push(`/s/${normalizedLocation}/${normalizedSearch}`);
            loadSearchCriteria(search, location);
            loadSearchResults(search, location, commonTypes.SearchDisplay.ORDER_BY_DISTANCE);
        }
    }

    public render() {
        const {searchCriteria} = this.props;
        const {search, location, display } = this.props.match.params;

        return (
            <div className="page-wrapper">
                <div className="search-criteria-wrapper">
                    <div className="search-criteria">
                        <SearchForm onSubmit={this.handleFormSubmit} initialValues={searchCriteria}/>
                    </div>
                </div>
                <SearchResult search={search} location={location} display={urlHelper.getSearchDisplayFromUrlParameter(display)}/>
            </div>
        );
    }
}

// CONNECT

const mapStateToProps = (state: commonTypes.ReduxState): SearchPageStateProps => ({
    searchCriteria: state.search.criteria,
});

const mapDispatchToProps = (dispatch: Dispatch<commonTypes.ReduxState>): SearchPageDispatchProps => ({
    loadSearchCriteria: (search: string, location: string) => dispatch(searchActions.searchCriteriaLoad(search, location)),
    loadSearchResults: (search: string, location: string, display: commonTypes.SearchDisplay) => dispatch(searchActions.searchLoad(search, location, display)),
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

export {ConnectedSearchPage as SearchPage};
