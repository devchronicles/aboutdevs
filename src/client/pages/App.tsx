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

interface AppStateProps {
    loggedUser: commonTypes.ReduxCurrentUserProfile
}

interface AppDispatchProps {

}

interface AppOwnProps extends ReactRouter.RouteComponentProps<any> {

}

declare type AppProps = AppStateProps & AppDispatchProps & AppOwnProps;

const App: React.SFC<AppProps> = ({ loggedUser }) => (
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

const mapStateToProps = (state: clientTypes.ReduxState): AppStateProps => ({
    loggedUser: state.loggedUser
});

const mapDispatchToProps = (dispatch: ReactRedux.Dispatch<clientTypes.ReduxState>): AppDispatchProps => ({

});

const mergeProps = (stateProps: AppStateProps, dispatchProps: AppDispatchProps, ownProps: AppOwnProps): AppProps => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps
});

const ConnectedApp = connect<AppStateProps, AppDispatchProps, AppOwnProps, AppProps>(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
)(App);


export { ConnectedApp as App }
