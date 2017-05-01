import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';


export default (initialState = {}) => {
    let middleware = applyMiddleware(thunk);

    if (process.env.NODE_ENV !== 'production') {
        /*eslint-disable*/
        const devToolsExtension = window.devToolsExtension;
        /*eslint-enable*/
        if (typeof devToolsExtension === 'function') {
            middleware = compose(middleware, devToolsExtension());
        }
    }

    const store = createStore(reducers, initialState, middleware);

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            /*eslint-disable*/
            store.replaceReducer(require('./reducers').default);
            /*eslint-enable*/
        });
    }

    return store;
};
