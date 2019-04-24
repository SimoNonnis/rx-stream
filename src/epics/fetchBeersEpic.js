import { ajax } from "rxjs/ajax";
import { map } from "rxjs/operators";

import { fetchFulfilled } from "../actions/beersActions";

const API = "https://api.punkapi.com/v2/beers";

const fetchBeersEpic = () => {
  return ajax.getJSON(API).pipe(map(resp => fetchFulfilled(resp)));
};

export default fetchBeersEpic;
