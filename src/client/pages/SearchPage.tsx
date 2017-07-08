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

interface ISearchPageStateProps {

}

interface ISearchPageDispatchProps {

}

interface ISearchPageOwnProps extends ReactRouter.RouteComponentProps<any> {

}

declare type ISearchPageProps = ISearchPageStateProps & ISearchPageDispatchProps & ISearchPageOwnProps;

const SearchPage: React.SFC<ISearchPageProps> = () => (<div className="page-wrapper">
    <SearchWrapper>
        <Hero />
        <SearchForm handleSubmit={() => { }} />
    </SearchWrapper>
    <SearchResult profiles={profiles} />
</div>);


// CONNECT

const mapStateToProps = (state: clientTypes.ReduxState): ISearchPageStateProps => ({
    loggedUser: state.loggedUser
});

const mapDispatchToProps = (dispatch: ReactRedux.Dispatch<clientTypes.ReduxState>): ISearchPageDispatchProps => ({

});

const mergeProps = (stateProps: ISearchPageStateProps, dispatchProps: ISearchPageDispatchProps, ownProps: ISearchPageOwnProps): ISearchPageProps => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps
});

const ConnectedSearchPage = connect<ISearchPageStateProps, ISearchPageDispatchProps, ISearchPageOwnProps, ISearchPageProps>(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
)(SearchPage);

export { ConnectedSearchPage as SearchPage }

