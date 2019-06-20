import { TestScheduler } from "rxjs/testing";
import { of } from "rxjs";

import { initialstate } from "../reducers/configReducer";
import { fetchBeersEpic } from "./index";
import {
  search,
  setStatus,
  fetchFulfilled,
  fetchFailed
} from "../actions/beersActions";

describe("Test fetchBeersEpic", () => {
  it("should produce correct actions (success)", () => {
    const testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });

    testScheduler.run(({ hot, cold, expectObservable }) => {
      const actions$ = hot("a", {
        a: search("ship")
      });
      const state$ = of({
        config: initialstate
      });
      const dependencies = {
        getJSON: url => {
          return cold("-a", {
            a: [{ name: "Beer 1" }]
          });
        },
        document
      };
      const output$ = fetchBeersEpic(actions$, state$, dependencies);

      expectObservable(output$).toBe("500ms ab", {
        a: setStatus("pending"),
        b: fetchFulfilled([{ name: "Beer 1" }])
      });
    });
  });

  it("should produce correct actions (error)", () => {
    const testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });

    testScheduler.run(({ hot, cold, expectObservable }) => {
      const actions$ = hot("a", {
        a: search("ship")
      });
      const state$ = of({
        config: initialstate
      });
      const dependencies = {
        getJSON: url => {
          return cold("-#", null, {
            message: "Ooops!"
          });
        },
        document
      };
      const output$ = fetchBeersEpic(actions$, state$, dependencies);

      expectObservable(output$).toBe("500ms ab", {
        a: setStatus("pending"),
        b: fetchFailed("Ooops!")
      });
    });
  });
});
