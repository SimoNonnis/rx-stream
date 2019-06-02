import { ajax } from "rxjs/ajax";
import {
  debounceTime,
  filter,
  switchMap,
  map,
  catchError,
  delay,
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

const search = (apiBase, term) =>
  `${apiBase}?beer_name=${encodeURIComponent(term)}`;

const fetchBeersEpic = (actions$, state$) => {
  return actions$.pipe(
    ofType(SEARCH),
    debounceTime(500),
    filter(({ payload }) => payload.trim() !== ""),
    withLatestFrom(state$.pipe(pluck("config", "apiBase"))),
    switchMap(([{ payload }, apiBase]) => {
      const ajax$ = ajax.getJSON(search(apiBase, payload.trim())).pipe(
        delay(5000),
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
