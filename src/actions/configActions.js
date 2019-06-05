export const SET_CONFIG = "SET_CONFIG";

export const setConfig = perPageNumber => {
  return {
    type: SET_CONFIG,
    payload: perPageNumber
  };
};
