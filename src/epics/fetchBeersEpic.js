import { ajax } from "rxjs/ajax";
import { map, switchMap } from "rxjs/operators";
import { ofType } from "redux-observable";
import { concat, of } from "rxjs";

import { FETCH_DATA, setStatus, fetchFulfilled } from "../actions/beersActions";

const API = "https://api.punkapi.com/v2/beers";

const fetchBeersEpic = actions$ => {
  return actions$.pipe(
    ofType(FETCH_DATA),
    switchMap(() => {
      return concat(
        of(setStatus("pending")),
        ajax.getJSON(API).pipe(map(resp => fetchFulfilled(resp)))
      );
    })
  );
};

export default fetchBeersEpic;
