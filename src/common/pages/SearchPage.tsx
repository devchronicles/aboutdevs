import * as React from 'react';
import {connect} from 'react-redux';
import * as ReactRouter from 'react-router';
import * as clientTypes from '../typings';
import * as ReactRedux from 'react-redux';
import * as searchActions from '../redux/search/searchActions';
import * as commonTypes from '../typings/commonTypes';

import {SearchWrapper} from '../components/SearchWrapper';
import {SearchForm} from '../components/SearchForm';
import {SearchResult} from '../components/SearchResult';

import {profiles} from '../lib/stubs';

interface SearchPageStateProps {
    searchCriteria: commonTypes.SearchCriteria,
}

interface SearchPageDispatchProps {
    searchCriteriaLoad: (search: string, location: string) => void;
}

interface SearchPageOwnProps extends ReactRouter.RouteComponentProps<{ search: string, location: string }> {

}

declare type SearchPageProps = SearchPageStateProps & SearchPageDispatchProps & SearchPageOwnProps;

class SearchPage extends React.Component<SearchPageProps> {

    public componentDidMount() {
        const {searchCriteriaLoad} = this.props;
        const {search, location} = this.props.match.params;
        searchCriteriaLoad(search, location);
    }

    private handleFormSubmit = (formValues: any) => {
        const {history} = this.props;
        const {location, professional} = formValues;
        if (location && professional) {
            history.push(`/s/${location}/${professional}`);
        }
    }

    public render() {
        const { searchCriteria } = this.props;
        return (
            <div className="page-wrapper">
                <SearchWrapper>
                    <SearchForm handleSubmit={this.handleFormSubmit} initialValues={searchCriteria} />
                </SearchWrapper>
                <SearchResult profiles={profiles}/>
            </div>
        );
    }
}

// CONNECT

const mapStateToProps = (state: clientTypes.ReduxState): SearchPageStateProps => ({
    searchCriteria: state.search.criteria,
});

const mapDispatchToProps = (dispatch: ReactRedux.Dispatch<clientTypes.ReduxState>): SearchPageDispatchProps => ({
    searchCriteriaLoad: (search: string, location: string) => dispatch(searchActions.searchCriteriaLoad(search, location)),
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
