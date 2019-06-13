import { ofType } from "redux-observable";
import { withLatestFrom, pluck, tap, ignoreElements } from "rxjs/operators";

import { SET_CONFIG } from "../actions/configActions";
import CACHE_KEY from "./cacheKey";

const persistEpic = (actions$, state$) => {
  return actions$.pipe(
    ofType(SET_CONFIG),
    withLatestFrom(state$.pipe(pluck("config", "perPage"))),
    tap(([action, config]) => {
      localStorage.setItem(CACHE_KEY, JSON.stringify(config));
    }),
    ignoreElements()
  );
};

export default persistEpic;
