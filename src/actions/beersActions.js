export const FETCH_FULFILLED = "FETCH_FULLFILLED";

export const fetchFulfilled = resp => {
  return {
    type: FETCH_FULFILLED,
    payload: resp
  };
};
