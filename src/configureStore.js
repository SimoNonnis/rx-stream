import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { combineEpics, createEpicMiddleware } from "redux-observable";
import { ajax } from "rxjs/ajax";

import { beersReducer, configReducer } from "./reducers";
import { fetchBeersEpic, persistEpic, hydrateEpic } from "./epics";

const configureStore = (dependencies = {}) => {
  const rootEpic = combineEpics(fetchBeersEpic, persistEpic, hydrateEpic);
  const epicMiddleware = createEpicMiddleware({
    dependencies: { getJSON: ajax.getJSON, document, ...dependencies }
  });

  const rootReducer = combineReducers({
    beers: beersReducer,
    config: configReducer
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
