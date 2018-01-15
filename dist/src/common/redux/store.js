"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const redux_thunk_1 = require("redux-thunk");
const reducers_1 = require("./reducers");
function configureStore(initialState) {
    let middleware = redux_1.applyMiddleware(redux_thunk_1.default);
    if (process.env.NODE_ENV !== "production" && typeof window !== "undefined") {
        const devToolsExtension = window.devToolsExtension;
        if (typeof devToolsExtension === "function") {
            middleware = redux_1.compose(middleware, devToolsExtension());
        }
    }
    const store = redux_1.createStore(reducers_1.default, initialState, middleware);
    if (module && module.hot) {
        module.hot.accept("./reducers", () => {
            store.replaceReducer(require("./reducers").default);
        });
    }
    return store;
}
exports.configureStore = configureStore;
//# sourceMappingURL=store.js.map