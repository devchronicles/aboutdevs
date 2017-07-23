import * as React from 'react';
import * as commonTypes from '../../common/typings';
import * as ReactRedux from 'react-redux';
import * as textHelper from '../helpers/textHelper';
import * as stringHelper from '../helpers/stringHelper';

import {ProfileCard} from './SearchProfileCard';
import {SearchDisplayDropdown} from './SearchDisplayDropdown';

interface SearchResultStateProps {
    searchResultProfiles: commonTypes.UserSearchProfile[];
}

interface SearchResultDispatchProps {

}

interface SearchResultOwnProps {

}

declare type SearchResultProps = SearchResultStateProps & SearchResultDispatchProps & SearchResultOwnProps;

class SearchResult extends React.Component <SearchResultProps> {
    public render() {
        const {searchResultProfiles} = this.props;
        return (
            <ul className="search-result">
                <div className="header">
                    <span className="display">
                        Exibindo profissionais <b>{stringHelper.decapitalizeFirstLetter(textHelper.getSearchDisplayText(commonTypes.SearchDisplay.ORDER_BY_DISTANCE))}</b>
                    </span>
                    <span className="display-selector">
                        <SearchDisplayDropdown currentOption={commonTypes.SearchDisplay.ORDER_BY_DISTANCE}/>
                    </span>
                </div>
                <div className="profiles">
                    {searchResultProfiles && searchResultProfiles.map((p, i) => <ProfileCard key={i} profile={p}/>)}
                </div>
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
