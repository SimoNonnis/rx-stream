import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { combineEpics, createEpicMiddleware } from "redux-observable";

import { appReducer, beersReducer } from "./reducers";
import { fetchBeersEpic } from "./epics";

const configureStore = () => {
  const rootEpic = combineEpics(fetchBeersEpic);
  const epicMiddleware = createEpicMiddleware();

  const rootReducer = combineReducers({
    app: appReducer,
    beers: beersReducer
  });

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(epicMiddleware))
  );

  epicMiddleware.run(rootEpic);

  return store;
};

export default configureStore;
