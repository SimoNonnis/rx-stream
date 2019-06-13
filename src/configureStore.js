import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { combineEpics, createEpicMiddleware } from "redux-observable";

import { beersReducer, configReducer } from "./reducers";
import { fetchBeersEpic, persistEpic, hydrateEpic } from "./epics";

const configureStore = () => {
  const rootEpic = combineEpics(fetchBeersEpic, persistEpic, hydrateEpic);
  const epicMiddleware = createEpicMiddleware();

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
