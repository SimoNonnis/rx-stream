import { SET_CONFIG } from "../actions/configActions";

export const initialstate = {
  apiBase: "https://api.punkapi.com/v2/beers",
  perPage: 4
};

const configReducer = (state = initialstate, action) => {
  switch (action.type) {
    case SET_CONFIG: {
      return {
        ...state,
        perPage: Number(action.payload)
      };
    }

    default:
      return state;
  }
};

export default configReducer;
