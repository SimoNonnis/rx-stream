import { ajax } from "rxjs/ajax";
import {
  debounceTime,
  filter,
  switchMap,
  map,
  catchError,
  delay,
  mapTo
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

const API = "https://api.punkapi.com/v2/beers";
const search = term => `${API}?beer_name=${encodeURIComponent(term)}`;

const fetchBeersEpic = actions$ => {
  return actions$.pipe(
    ofType(SEARCH),
    debounceTime(500),
    filter(({ payload }) => payload.trim() !== ""),
    switchMap(({ payload }) => {
      const ajax$ = ajax.getJSON(search(payload.trim())).pipe(
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
