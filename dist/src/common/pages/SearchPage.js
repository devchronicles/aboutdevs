"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const SearchForm_1 = require("../components/SearchForm");
const SearchResult_1 = require("../components/SearchResult");
const routeHelper_1 = require("../../server/helpers/routeHelper");
const tagHelper_1 = require("../../server/helpers/tagHelper");
const googlePlacesFormatHelper_1 = require("../helpers/googlePlacesFormatHelper");
class SearchPage extends React.Component {
    constructor() {
        super(...arguments);
        this.handleFormSubmit = (formValues) => {
            const { searchTags, searchFormattedAddress } = formValues;
            this.props.history.push(routeHelper_1.getDeveloperSearchUrl(searchTags, searchFormattedAddress));
        };
    }
    render() {
        const { tags, googlePlaceId, placeString } = this.props.match.params;
        const tagsDecoded = decodeURIComponent(tags);
        const tagsDistilled = tagHelper_1.distillTagsParameter(tagsDecoded);
        const formattedAddress = googlePlacesFormatHelper_1.formatAddress(googlePlaceId, decodeURIComponent(placeString));
        const initialValues = {
            searchTags: tagsDistilled,
            searchFormattedAddress: formattedAddress,
        };
        return (React.createElement("div", { className: "page-wrapper" },
            React.createElement("div", { className: "search-criteria-wrapper" },
                React.createElement("div", { className: "search-criteria" },
                    React.createElement(SearchForm_1.SearchForm, { onSubmit: this.handleFormSubmit, initialValues: initialValues }))),
            React.createElement(SearchResult_1.SearchResult, { tags: tagsDecoded, formattedAddress: formattedAddress })));
    }
}
// CONNECT
const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});
const mergeProps = (stateProps, dispatchProps, ownProps) => (Object.assign({}, stateProps, dispatchProps, ownProps));
const ConnectedSearchPage = react_redux_1.connect(mapStateToProps, mapDispatchToProps, mergeProps)(SearchPage);
exports.SearchPage = ConnectedSearchPage;
//# sourceMappingURL=SearchPage.js.map