import {
  USER_LOADED,
  LOGIN_SUCCESS,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILED,
  AUTH_ERROR,
  LOGIN_FAILED,
  LOGOUT_SUCCESS,
  AUTH_CLEAR_ERRORS
} from "../actions/types";

const baseState = {
  token: null,
  isAuthenticated: false,
  isLoading: true,
  user: null,
  errors: {}
};

// Check on startup if timestamp is too old
// and then remove the cookie if necessary
const initialState =
  localStorage.getItem("isAuth") === null
    ? baseState
    : new Date().getTime() -
        JSON.parse(localStorage.getItem("isAuth")).timeSet >
      86000000
    ? baseState
    : {
        token: localStorage.getItem("token"),
        isAuthenticated: true,
        isLoading: true,
        user: JSON.parse(localStorage.getItem("user")),
        errors: {}
      };

export default function auth(state = initialState, action) {
  // TODO: Actually load the info in a different State!
  let logginDate = new Date();

  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.user
      };

    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.data.token);
      localStorage.setItem(
        "isAuth",
        JSON.stringify({ loggedIn: true, timeSet: logginDate.getTime() })
      );
      localStorage.setItem("user", JSON.stringify(action.data.user));
      return {
        ...state,
        ...action.data,
        isAuthenticated: true,
        isLoading: false,
        errors: null
      };

    case REGISTRATION_SUCCESS:
      localStorage.setItem("token", action.data.token);
      localStorage.setItem(
        "isAuth",
        JSON.stringify({ loggedIn: true, timeSet: logginDate.getTime() })
      );
      localStorage.setItem("user", JSON.stringify(action.data.user));
      return {
        ...state,
        ...action.data,
        isAuthenticated: true,
        isLoading: false,
        errors: null
      };

    case REGISTRATION_FAILED:
      return { ...state, errors: { register: "REGISTRATION_FAILED" } };

    case AUTH_ERROR:
      return { ...state };
    case LOGIN_FAILED:
      return { ...state, errors: action.data };
    case LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      localStorage.removeItem("isAuth");
      localStorage.removeItem("user");
      return {
        ...state,
        errors: action.data,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false
      };
    case AUTH_CLEAR_ERRORS:
      return { ...state, errors: {} };
    default:
      return state;
  }
}
