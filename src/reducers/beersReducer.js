import { FETCH_FULFILLED, SET_STATUS } from "../actions/beersActions";

const initialstate = {
  data: [],
  status: "idle" // "idle" | "pending" | "success" | "failure";
};

const beersReducer = (state = initialstate, action) => {
  switch (action.type) {
    case SET_STATUS: {
      return {
        ...state,
        status: action.payload
      };
    }

    case FETCH_FULFILLED: {
      return {
        ...state,
        status: "success",
        data: action.payload
      };
    }

    default:
      return state;
  }
};

export default beersReducer;
