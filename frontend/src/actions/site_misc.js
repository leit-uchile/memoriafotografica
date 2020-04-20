import {
  SET_ALERT,
  REMOVE_ALERT,
  INVISIBLE_ROUTE,
  SET_ROUTE,
  ADD_LOGIN_SUCCESS_ROUTE,
  SEARCH_PUT_META,
  SEARCH_REMOVE_META,
  HOME_SET_SELECTED_INDEX,
  READ_UPLOAD_DISCLOSURE,
  HOME_PHOTO_PAGINATION,
  RECOVERED_PHOTOS
} from "./types";
import uuid from "uuid";

export const setAlert = (msg, alertType, timeout = 5000) => (dispatch) => {
  const id = uuid.v4();
  dispatch({
    type: SET_ALERT,
    data: { msg, alertType, id },
  });
  // Quitar el mensaje despues de 5s
  setTimeout(() => dispatch({ type: REMOVE_ALERT, data: id }), timeout);
};

/**
 * Set the route for navigation
 * @param {String} route
 */
export const setCurrentRoute = (route) => {
  if (route === undefined || route === null) {
    return (dispatch) => {
      dispatch({ type: INVISIBLE_ROUTE, data: null });
    };
  } else {
    return (dispatch) => {
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
export const addLoginRoute = (route) => (dispatch, getState) => {
  if (getState().user.isAuthenticated === false) {
    dispatch({ type: ADD_LOGIN_SUCCESS_ROUTE, data: route });
  } else {
    dispatch({ type: ADD_LOGIN_SUCCESS_ROUTE, data: null });
  }
};

export const putSearchItem = (metaID, value) => {
  return (dispatch, getState) => {
    return dispatch({ type: SEARCH_PUT_META, data: { metaID, value } });
  };
};

export const removeSearchItem = (metaID, value) => {
  return (dispatch, getState) => {
    return dispatch({ type: SEARCH_REMOVE_META, data: { metaID, value } });
  };
};


/**
 * Set Photo to visualize over the search result by ID
 * @param {*} id 
 */
export const setSelectedId = id => (dispatch, getState) =>
  dispatch({ type: HOME_SET_SELECTED_INDEX, data: id });

/**
 * Set Number of page on PhotoDetails (persistent data)
 * @param {*} index 
 */
export const setPhotoPagination = index => dispatch =>
  dispatch({ type: HOME_PHOTO_PAGINATION, data: index})

/**
 * Push photo array so that we can navigate albums, categories
 * and collections using the photodetails component
 * @param {Array} photos
 */
export const pushPhotoArray = photos => dispatch => dispatch({type: RECOVERED_PHOTOS, data: photos})

export const readDisclosure = () => (dispatch, getState) =>
  dispatch({ type: READ_UPLOAD_DISCLOSURE, data: null });

