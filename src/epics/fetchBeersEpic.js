import {
  debounceTime,
  filter,
  switchMap,
  map,
  catchError,
  //delay,
  mapTo,
  withLatestFrom,
  pluck
} from "rxjs/operators";
import { ofType } from "redux-observable";
import { concat, of, merge, fromEvent, race } from "rxjs";

import {
  SEARCH,
  setStatus,
  fetchFulfilled,
  fetchFailed,
  CANCEL,
  reset
} from "../actions/beersActions";

const search = (apiBase, term, perPage) =>
  `${apiBase}?beer_name=${encodeURIComponent(term)}&per_page=${perPage}`;

const fetchBeersEpic = (actions$, state$, { getJSON, document }) => {
  return actions$.pipe(
    ofType(SEARCH),
    debounceTime(500),
    filter(({ payload }) => payload.trim() !== ""),
    withLatestFrom(state$.pipe(pluck("config"))),
    switchMap(([{ payload }, config]) => {
      const ajax$ = getJSON(
        search(config.apiBase, payload.trim(), config.perPage)
      ).pipe(
        //delay(5000),
        map(resp => fetchFulfilled(resp)),
        catchError(resp => {
          return of(fetchFailed(resp.message));
        })
      );

      const blocker$ = merge(
        actions$.pipe(ofType(CANCEL)),
        fromEvent(document, "keyup").pipe(
          filter(evt => evt.key === "Escape" || evt.key === "Esc")
        )
      ).pipe(mapTo(reset()));

      return concat(of(setStatus("pending")), race(ajax$, blocker$));
    })
  );
};

export default fetchBeersEpic;
