import * as React from 'react';
import { connect } from 'react-redux';
import * as ReactRouter from 'react-router';
import * as clientTypes from '../typings';
import * as commonTypes from '../../common/typings';
import * as ReactRedux from 'react-redux';
import * as urlHelper from '../../common/helpers/urlHelper';

import { IndexSearchForm } from '../components/IndexSearchForm';

interface IndexPageStateProps {

}

interface IndexPageDispatchProps {

}

interface IndexPageOwnProps extends ReactRouter.RouteComponentProps<any> {

}

declare type IndexPageProps = IndexPageStateProps & IndexPageDispatchProps & IndexPageOwnProps;

class IndexPage extends React.Component<IndexPageProps> {

    public handleSearchSubmit = (formValues: any) => {
        const { history } = this.props;
        const { location, professional } = formValues;
        const normalizedLocation = urlHelper.normalizeUrlParameter(location);
        const normalizedProfessional = urlHelper.normalizeUrlParameter(professional);
        if (location && professional) {
            this.props.history.push(`/s/${normalizedLocation}/${normalizedProfessional}`);
        }
    }

    public render() {
        return (
            <div className="page-wrapper">
                <div className="index-page-wrapper">
                    <div className="index-search-form">
                        <div className="logo-wrapper">
                            <span className="index-hero">
                                <div className="icon-box">
                                    <i className="fa fa-map-marker" aria-hidden="true" />
                                </div>
                                <div className="hero-text">
                                    <div className="hero-logo">tazzo</div>
                                    <div className="hero-motto">do que você precisa hoje?</div>
                                </div>
                            </span>
                        </div>
                        <IndexSearchForm onSubmit={this.handleSearchSubmit} />
                        <div className="register-wrapper">
                            <span className="text">
                                Você é um(a) profissional?
                </span>
                            <button className="faded">
                                junte-se a nós, é grátis!
                </button>
                        </div>
                    </div>
                </div>
            </div>);
    }
}
// CONNECT

const mapStateToProps = (state: clientTypes.ReduxState): IndexPageStateProps => ({
    loggedUser: state.loggedUser,
});

const mapDispatchToProps = (dispatch: ReactRedux.Dispatch<clientTypes.ReduxState>): IndexPageDispatchProps => ({

});

const mergeProps = (stateProps: IndexPageStateProps, dispatchProps: IndexPageDispatchProps, ownProps: IndexPageOwnProps): IndexPageProps => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
});

const ConnectedIndexPage = connect<IndexPageStateProps, IndexPageDispatchProps, IndexPageOwnProps, IndexPageProps>(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
)(IndexPage);

export { ConnectedIndexPage as IndexPage };
