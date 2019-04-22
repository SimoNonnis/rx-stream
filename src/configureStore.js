import { createStore, combineReducers } from "redux";

import appReducer from "./reducers/appReducer";

const configureStore = () => {
  const rootReducer = combineReducers({
    app: appReducer
  });
  return createStore(rootReducer);
};

export default configureStore;
