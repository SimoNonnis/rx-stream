import { ajax } from "rxjs/ajax";
import { debounceTime, filter, switchMap, map } from "rxjs/operators";
import { ofType } from "redux-observable";
import { concat, of } from "rxjs";

import { SEARCH, setStatus, fetchFulfilled } from "../actions/beersActions";

const API = "https://api.punkapi.com/v2/beers";
const search = term => `${API}?beer_name=${encodeURIComponent(term)}`;

const fetchBeersEpic = actions$ => {
  return actions$.pipe(
    ofType(SEARCH),
    debounceTime(500),
    filter(({ payload }) => payload.trim() !== ""),
    switchMap(({ payload }) => {
      return concat(
        of(setStatus("pending")),
        ajax
          .getJSON(search(payload.trim()))
          .pipe(map(resp => fetchFulfilled(resp)))
      );
    })
  );
};

export default fetchBeersEpic;
