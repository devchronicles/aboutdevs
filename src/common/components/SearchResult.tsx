import * as React from 'react';
import * as commonTypes from '../../common/typings';
import * as ReactRedux from 'react-redux';
import * as textHelper from '../helpers/textHelper';
import * as stringHelper from '../helpers/stringHelper';

import {SearchDisplayDropdown} from './SearchDisplayDropdown';
import { ProfileList } from "./ProfileList";

interface SearchResultStateProps {
    searchResultProfiles: commonTypes.UserSearchProfile[];
}

interface SearchResultDispatchProps {

}

interface SearchResultOwnProps {
    location: string;
    search: string;
    display: commonTypes.SearchDisplay;
}

declare type SearchResultProps = SearchResultStateProps & SearchResultDispatchProps & SearchResultOwnProps;

class SearchResult extends React.Component <SearchResultProps> {
    public render() {
        const {searchResultProfiles, display, location, search} = this.props;
        return (
            <ul className="search-result">
                <div className="search-result-header">
                    <span className="display">
                        Exibindo profissionais <b>{stringHelper.decapitalizeFirstLetter(textHelper.getSearchDisplayText(display))}</b>
                    </span>
                    <span className="display-selector">
                        <SearchDisplayDropdown value={display} search={search} location={location}/>
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
