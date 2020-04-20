import {
  GET_GENERAL_STATS,
  GET_GENERAL_STATS_ERROR,
} from "../actions/types";

const initialState = {
  general: null,
  error: null,
};

export default function metrics(state = initialState, action) {
  switch (action.type) {
    case GET_GENERAL_STATS:
      return { ...state, general: action.data };
    case GET_GENERAL_STATS_ERROR:
      return { ...state, error: action.data };
    default:
      return state;
  }
}
