import { of, EMPTY } from "rxjs";

import { setConfig } from "../actions/configActions";
import CACHE_KEY from "./cacheKey";

const hydrateEpic = (actions$, state$) => {
  const maybeConfig = localStorage.getItem(CACHE_KEY);

  if (typeof maybeConfig === "string") {
    try {
      const parsedConfig = JSON.parse(maybeConfig);

      return of(setConfig(parsedConfig));
    } catch (e) {
      return EMPTY;
    }
  } else {
    return EMPTY;
  }
};

export default hydrateEpic;
