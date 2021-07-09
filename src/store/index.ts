import { createStore, compose, applyMiddleware, Middleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import { createLogger } from "redux-logger";
import { persistStore } from "redux-persist";

import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";

const isDev = process.env.NODE_ENV === "development" && typeof window !== "undefined";
const composeEnhancers: any = (isDev && composeWithDevTools) || compose;

const sagaMiddleware = createSagaMiddleware();
const loggerMiddleware = createLogger({ duration: true, collapsed: true });

const middlewares: Middleware[] = [sagaMiddleware];

if (isDev) middlewares.push(loggerMiddleware);

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)));
export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);
