import { createStore, combineReducers, applyMiddleware } from "redux";
import { combineEpics, createEpicMiddleware } from "redux-observable";
import { of } from "rxjs";

import { appReducer } from "./reducers";

const epic1 = () => of({ type: "SET_NAME", payload: "Anastasia" });

const configureStore = () => {
  const rootEpic = combineEpics(epic1);
  const epicMiddleware = createEpicMiddleware();

  const rootReducer = combineReducers({
    app: appReducer
  });
  const store = createStore(rootReducer, applyMiddleware(epicMiddleware));

  epicMiddleware.run(rootEpic);

  return store;
};

export default configureStore;
