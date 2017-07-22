import * as React from 'react';
import * as commonTypes from '../../common/typings';
import * as ReactRedux from 'react-redux';

import {ProfileCard} from './SearchProfileCard';

interface SearchResultStateProps {
    searchResult: commonTypes.SearchResult;
}

interface SearchResultDispatchProps {

}

interface SearchResultOwnProps {

}

declare type SearchResultProps = SearchResultStateProps & SearchResultDispatchProps & SearchResultOwnProps;

class SearchResult extends React.Component <SearchResultProps> {
    public render() {
        const {searchResult} = this.props;
        return (
            <ul className="search-result">
                <div className="header">
                    <span>
                        <span>
                            Exibindo:
                        </span>
                        <span>
                            Profissionais ordenados por distância
                        </span>
                    </span>
                </div>
                <div className="profiles">
                    {searchResult.profiles.map((p, i) => <ProfileCard key={i} profile={p}/>)}
                </div>
            </ul>
        );
    }
}

const mapStateToProps = (state: commonTypes.ReduxState): SearchResultStateProps => ({
    searchResult: state.search.result,
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
