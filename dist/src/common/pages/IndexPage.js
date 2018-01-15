"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const IndexSearchFormWrapper_1 = require("../components/IndexSearchFormWrapper");
const routeHelper_1 = require("../../server/helpers/routeHelper");
class IndexPage extends React.Component {
    constructor() {
        super(...arguments);
        this.handleSearchSubmit = (formValues) => {
            const { searchTags, searchFormattedAddress } = formValues;
            this.props.history.push(routeHelper_1.getDeveloperSearchUrl(searchTags, searchFormattedAddress));
        };
    }
    render() {
        return (React.createElement("div", { className: "page-wrapper" },
            React.createElement("div", { className: "index-page-wrapper background-page-wrapper" },
                React.createElement(IndexSearchFormWrapper_1.IndexSearchFormWrapper, { handleSearchSubmit: this.handleSearchSubmit }))));
    }
}
// CONNECT
const mapStateToProps = (state) => ({
    loggedUser: state.loggedUser,
});
const mapDispatchToProps = (dispatch) => ({});
const mergeProps = (stateProps, dispatchProps, ownProps) => (Object.assign({}, stateProps, dispatchProps, ownProps));
const ConnectedIndexPage = react_redux_1.connect(mapStateToProps, mapDispatchToProps, mergeProps)(IndexPage);
exports.IndexPage = ConnectedIndexPage;
//# sourceMappingURL=IndexPage.js.map