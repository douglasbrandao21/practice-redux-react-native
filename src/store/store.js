import { createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./ducks/ducks";
import rootSaga from "./sagas/sagas";

const sagaMonitor = __DEV__ ? console.tron.createSagaMonitor() : null;

const tronMiddleware =
  process.env.NODE_ENV === "development"
    ? console.tron.createEnhancer
    : () => {};

const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

const store = createStore(
  rootReducer,
  compose(
    tronMiddleware(),
    applyMiddleware(sagaMiddleware)
  )
);

sagaMiddleware.run(rootSaga);

export default store;
