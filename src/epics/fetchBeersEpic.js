import { ajax } from "rxjs/ajax";
import { tap, ignoreElements } from "rxjs/operators";
const API = "https://api.punkapi.com/v2/beers";

const fetchBeersEpic = () => {
  return ajax.getJSON(API).pipe(
    tap(x => console.log(x)),
    ignoreElements()
  );
};

export default fetchBeersEpic;
