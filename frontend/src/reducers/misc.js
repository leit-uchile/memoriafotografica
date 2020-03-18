import {
  SET_ROUTE,
  INVISIBLE_ROUTE,
  ADD_LOGIN_SUCCESS_ROUTE
} from "../actions/types";

const initialState = {
  currentRoute: "/Inicio",
  loginSuccessRoute: ""
};

export default function misc(state = initialState, action) {
  switch (action.type) {
    case SET_ROUTE:
      return { ...state, currentRoute: action.data };
    case INVISIBLE_ROUTE:
      return { ...state, currentRoute: undefined };
    case ADD_LOGIN_SUCCESS_ROUTE:
      return { ...state, loginSuccessRoute: action.data };
    default:
      return { ...state };
  }
}
