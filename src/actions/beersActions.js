export const FETCH_DATA = "FETCH_DATA";
export const SET_STATUS = "SET_STATUS";
export const FETCH_FULFILLED = "FETCH_FULLFILLED";

export const fetchData = () => {
  return {
    type: FETCH_DATA
  };
};

export const setStatus = status => {
  return {
    type: SET_STATUS,
    payload: status
  };
};

export const fetchFulfilled = resp => {
  return {
    type: FETCH_FULFILLED,
    payload: resp
  };
};
