import * as React from 'react';
import { connect } from 'react-redux';
import * as ReactRouter from 'react-router';
import * as clientTypes from '../typings';
import * as commonTypes from '../../common/typings';
import * as ReactRedux from 'react-redux';

import { IndexSearchForm } from '../components/IndexSearchForm';

interface IIndexPageStateProps {

}

interface IIndexPageDispatchProps {

}

interface IIndexPageOwnProps extends ReactRouter.RouteComponentProps<any> {

}

declare type IIndexPageProps = IIndexPageStateProps & IIndexPageDispatchProps & IIndexPageOwnProps;

const IndexPage: React.SFC<IIndexPageProps> = () => (<div className="page-wrapper">
    <div className="index-page-wrapper">
        <div className="index-search-form">
            <div className="logo-wrapper">
                <span className="index-hero">
                    <div className="icon-box">
                        <i className="fa fa-briefcase" aria-hidden="true" />
                    </div>
                    <div className="hero-text">
                        <div className="hero-logo">IndieJobs</div>
                        <div className="hero-motto">do que você precisa hoje?</div>
                    </div>
                </span>
            </div>
            <IndexSearchForm handleSubmit={() => { }} />
            <div className="register-wrapper">
                <span className="text">
                    Você é um(a) profissional?
                </span>
                <button className="faded">
                    Crie sua conta, é grátis!
                </button>
            </div>
        </div>
    </div>
</div>);

// CONNECT

const mapStateToProps = (state: clientTypes.IReduxState): IIndexPageStateProps => ({
    loggedUser: state.loggedUser
});

const mapDispatchToProps = (dispatch: ReactRedux.Dispatch<clientTypes.IReduxState>): IIndexPageDispatchProps => ({

});

const mergeProps = (stateProps: IIndexPageStateProps, dispatchProps: IIndexPageDispatchProps, ownProps: IIndexPageOwnProps): IIndexPageProps => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps
});

const ConnectedIndexPage = connect<IIndexPageStateProps, IIndexPageDispatchProps, IIndexPageOwnProps, IIndexPageProps>(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
)(IndexPage);

export { ConnectedIndexPage as IndexPage }
