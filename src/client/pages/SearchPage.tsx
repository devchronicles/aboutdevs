import * as React from 'react';
import { connect } from 'react-redux';
import * as ReactRouter from 'react-router';
import * as clientTypes from '../typings';
import * as commonTypes from '../../common/typings';
import * as ReactRedux from 'react-redux';

import { SearchWrapper } from '../components/SearchWrapper';
import { Hero } from '../components/Hero';
import { SearchForm } from '../components/SearchForm';
import { SearchResult } from '../components/SearchResult';

import { profiles } from '../lib/stubs';

interface SearchPageStateProps {

}

interface SearchPageDispatchProps {

}

interface SearchPageOwnProps extends ReactRouter.RouteComponentProps<any> {

}

declare type SearchPageProps = SearchPageStateProps & SearchPageDispatchProps & SearchPageOwnProps;

class SearchPage extends React.Component<SearchPageProps> {
    private handleFormSubmit = (formValues: any) => {
        const { history } = this.props;
        const { location, professional } = formValues;
        if (location && professional) {
            this.props.history.push(`/s/${location}/${professional}`);
        }
    }

    public render() {
        return (
            <div className="page-wrapper">
                <SearchWrapper>
                    <Hero />
                    <SearchForm handleSubmit={this.handleFormSubmit} />
                </SearchWrapper>
                <SearchResult profiles={profiles} />
            </div>
        );
    }
}

// CONNECT

const mapStateToProps = (state: clientTypes.ReduxState): SearchPageStateProps => ({
    loggedUser: state.loggedUser,
});

const mapDispatchToProps = (dispatch: ReactRedux.Dispatch<clientTypes.ReduxState>): SearchPageDispatchProps => ({

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
