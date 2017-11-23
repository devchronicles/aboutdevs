import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import * as commonTypes from "../typings";
import reducers from "./reducers";

export default (initialState: commonTypes.ReduxState, history: any) => {
    let middleware: any = applyMiddleware(thunk);

    if (process.env.NODE_ENV !== "production" && window) {
        const devToolsExtension = (window as any).devToolsExtension;
        if (typeof devToolsExtension === "function") {
            middleware = compose(middleware, devToolsExtension());
        }
    }

    const store = createStore(reducers, initialState, middleware);

    if (module && (module as any).hot) {
        (module as any).hot.accept("./reducers", () => {
            store.replaceReducer(require("./reducers").default);
        });
    }

    return store;
};
