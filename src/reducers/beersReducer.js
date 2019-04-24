import { FETCH_FULFILLED } from "../actions/beersActions";

const beersReducer = (state = { data: [], loading: true }, action) => {
  switch (action.type) {
    case FETCH_FULFILLED: {
      return {
        ...state,
        loading: false,
        data: action.payload
      };
    }

    default:
      return state;
  }
};

export default beersReducer;
