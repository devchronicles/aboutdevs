import * as React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';
import { Header } from '../components/Header';
import { IndexPage } from './IndexPage';
import { ProfileEditPage } from './ProfileEditPage';
import { SearchPage } from './SearchPage';
import * as clientTypes from '../typings';
import * as commonTypes from '../../common/typings';
import * as ReactRedux from 'react-redux';
import * as ReactRouter from 'react-router';

interface IAppStateProps {
    loggedUser: commonTypes.IReduxCurrentUserProfile
}

interface IAppDispatchProps {

}

interface IAppOwnProps extends ReactRouter.RouteComponentProps<any> {

}

declare type IAppProps = IAppStateProps & IAppDispatchProps & IAppOwnProps;

const App: React.SFC<IAppProps> = ({ loggedUser }) => (
    <div className="container">
        <Header loggedUser={loggedUser} />
        <Switch>
            <Route exact path="/search" component={SearchPage} />
            <Route exact path="/config/edituserprofile" component={ProfileEditPage} />
            <Route exact path="/" component={IndexPage} />
        </Switch>
    </div>
);

// CONNECT

const mapStateToProps = (state: clientTypes.IReduxState): IAppStateProps => ({
    loggedUser: state.loggedUser
});

const mapDispatchToProps = (dispatch: ReactRedux.Dispatch<clientTypes.IReduxState>): IAppDispatchProps => ({

});

const mergeProps = (stateProps: IAppStateProps, dispatchProps: IAppDispatchProps, ownProps: IAppOwnProps): IAppProps => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps
});

const ConnectedApp = connect<IAppStateProps, IAppDispatchProps, IAppOwnProps, IAppProps>(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
)(App);


export { ConnectedApp as App }
