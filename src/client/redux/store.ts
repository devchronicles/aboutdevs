import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import * as clientTypes from '../typings';

export default (initialState: clientTypes.ReduxState = { loggedUser: undefined, form: undefined }) => {
    let middleware: any = applyMiddleware(thunk);

    if (process.env.NODE_ENV !== 'production') {
        /*eslint-disable*/
        const devToolsExtension = (<any>window).devToolsExtension;
        /*eslint-enable*/
        if (typeof devToolsExtension === 'function') {
            middleware = compose(middleware, devToolsExtension());
        }
    }

    const store = createStore(reducers, initialState, middleware);

    if ((<any>module).hot) {
        (<any>module).hot.accept('./reducers', () => {
            /*eslint-disable*/
            store.replaceReducer(require('./reducers').default);
            /*eslint-enable*/
        });
    }

    return store;
};
