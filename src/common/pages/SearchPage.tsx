import * as React from "react";
import { connect } from "react-redux";
import * as ReactRouter from "react-router";
import * as commonTypes from "../typings/commonTypes";

import { SearchForm } from "../components/SearchForm";
import { SearchResult } from "../components/SearchResult";
import { Dispatch } from "redux";
import { getDeveloperSearchUrl } from "../../server/helpers/routeHelper";
import { SearchRouteType } from "../typings/routeTypes";
import { distillTagsParameter } from "../../server/helpers/tagHelper";
import { formatAddress } from "../helpers/locationFormatHelper";
import { SearchFormModel } from "../typings";
import { Footer } from "../components/form/Footer";
import { getPageTitleSearch } from "../helpers/pageTitleHelper";

interface SearchPageStateProps {
}

interface SearchPageDispatchProps {
}

interface SearchPageOwnProps extends ReactRouter.RouteComponentProps<SearchRouteType> {

}

declare type SearchPageProps = SearchPageStateProps & SearchPageDispatchProps & SearchPageOwnProps;

class SearchPage extends React.Component<SearchPageProps> {

    private handleFormSubmit = (formValues: any) => {
        const {searchTags, searchFormattedAddress} = formValues;
        this.props.history.push(getDeveloperSearchUrl(searchTags, searchFormattedAddress));
    }

    componentDidMount() {
        if (typeof document !== "undefined") {
            document.title = getPageTitleSearch();
        }
    }

    public render() {
        const {tags, googlePlaceId, placeString} = this.props.match.params;
        const tagsDecoded = tags ? decodeURIComponent(tags) : null;
        const tagsDistilled = tags ? distillTagsParameter(tagsDecoded) : null;
        const formattedAddress = googlePlaceId ? formatAddress(googlePlaceId, decodeURIComponent(placeString)) : "";

        const initialValues: SearchFormModel = {
            searchTags: tagsDistilled,
            searchFormattedAddress: formattedAddress,
        };

        return (
            <div className="page-wrapper">
                <div className="search-criteria-wrapper">
                    <div className="search-criteria">
                        <SearchForm onSubmit={this.handleFormSubmit} initialValues={initialValues}/>
                    </div>
                </div>
                <SearchResult tags={tagsDistilled} formattedAddress={formattedAddress}/>
                <Footer position={"bottom"}/>
            </div>
        );
    }
}

// CONNECT
const mapStateToProps = (state: commonTypes.ReduxState): SearchPageStateProps => ({});

const mapDispatchToProps = (dispatch: Dispatch<commonTypes.ReduxState>): SearchPageDispatchProps => ({});

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
