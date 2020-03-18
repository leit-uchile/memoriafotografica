import { INVISIBLE_ROUTE, SET_ROUTE, ADD_LOGIN_SUCCESS_ROUTE } from "./types";

/**
 * Set the route for navigation
 * @param {String} route
 */
export const setCurrentRoute = route => {
  if (route === undefined || route === null) {
    return dispatch => {
      dispatch({ type: INVISIBLE_ROUTE, data: null });
    };
  } else {
    return dispatch => {
      dispatch({ type: SET_ROUTE, data: route });
    };
  }
};

/**
 * If no user is authenticated add a route to push
 * into the Router after loggin has been completed
 *
 * Else erase the route
 * @param {String} route
 */
export const addLoginRoute = route => (dispatch, getState) => {
  if (getState().auth.isAuthenticated === false) {
    dispatch({ type: ADD_LOGIN_SUCCESS_ROUTE, data: route });
  } else {
    dispatch({ type: ADD_LOGIN_SUCCESS_ROUTE, data: null });
  }
};