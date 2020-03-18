import { SET_ALERT, REMOVE_ALERT } from "../actions/types";

const initialState = [];

export default function alert (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      var res = state.filter(alert => alert.id !== payload);
      return res ? res : [];
    default:
      return state;
  }
}
