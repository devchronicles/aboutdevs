"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ReactRedux = require("react-redux");
const ProfileList_1 = require("./ProfileList");
const searchActions = require("../redux/search/searchActions");
const tagHelper_1 = require("../../server/helpers/tagHelper");
const googlePlacesFormatHelper_1 = require("../helpers/googlePlacesFormatHelper");
class SearchResult extends React.Component {
    reloadResults() {
        const { loadSearchResults, tags, formattedAddress } = this.props;
        const tagsDistilled = tagHelper_1.distillTagsParameter(tags);
        loadSearchResults(tagsDistilled, formattedAddress);
    }
    componentDidMount() {
        this.reloadResults();
    }
    componentDidUpdate(prevProps) {
        const { tags, formattedAddress } = this.props;
        if (prevProps.tags !== tags || prevProps.formattedAddress !== formattedAddress) {
            this.reloadResults();
        }
    }
    render() {
        const { searchResultProfiles, formattedAddress, tags } = this.props;
        const { address } = googlePlacesFormatHelper_1.getDataFromFormattedAddress(formattedAddress);
        const tagComponents = tagHelper_1.distillTagsParameter(tags).map((tagName, i) => (React.createElement("span", { className: "tag", key: `tag-i` },
            "#",
            tagName)));
        return (React.createElement("ul", { className: "search-result" },
            React.createElement("div", { className: "search-result-header" },
                tagComponents,
                " developers in ",
                React.createElement("span", { className: "location" }, address)),
            React.createElement(ProfileList_1.ProfileList, { profiles: searchResultProfiles })));
    }
}
const mapStateToProps = (state) => ({
    searchResultProfiles: state.search.profiles,
});
const mapDispatchToProps = (dispatch) => ({
    loadSearchResults: (tags, formattedAddress) => dispatch(searchActions.searchLoad(tags, formattedAddress)),
});
const mergeProps = (stateProps, dispatchProps, ownProps) => (Object.assign({}, stateProps, dispatchProps, ownProps));
const ConnectedSearchResult = ReactRedux.connect(mapStateToProps, mapDispatchToProps, mergeProps)(SearchResult);
exports.SearchResult = ConnectedSearchResult;
//# sourceMappingURL=SearchResult.js.map