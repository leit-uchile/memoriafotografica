import {
  USER_RECOVERED_PHOTO_ERROR,
  USER_RECOVERED_PHOTO,
  USER_RECOVERED_ALBUM,
  USER_RECOVERED_COMMENTS,
  USER_RECOVERED_ALBUM_ERROR,
  USER_RECOVERED_COMMENTS_ERROR,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAILED,
  USER_LOADED,
  USER_PASSWORD_UPDATED,
  USER_PASSWORD_UPDATE_FAILED
} from "../actions/types";

/**
 * User will be loaded by the auth actions and dispatched here!
 * User deletion is done as a logout is successful
 */
const baseState = {
  photos: [],
  comments: [],
  albums: [],
  userData: null
};

const initialState =
  localStorage.getItem("isAuth") === null
    ? baseState
    : new Date().getTime() -
        JSON.parse(localStorage.getItem("isAuth")).timeSet >
      86000000
    ? baseState
    : {
        photos: [],
        comments: [],
        albums: [],
        userData: JSON.parse(localStorage.getItem("user"))
      };

export default function user(state = initialState, action) {
  switch (action.type) {
    case USER_LOADED:
      localStorage.setItem("user", JSON.stringify(action.data));
      return {
        ...state,
        userData: { ...action.data } // user
      };
    case USER_RECOVERED_PHOTO:
      return {
        ...state,
        photos: action.data
      };
    case USER_RECOVERED_ALBUM:
      return {
        ...state,
        albums: action.data
      };
    case USER_RECOVERED_COMMENTS:
      return {
        ...state,
        comments: action.data
      };
    case USER_RECOVERED_PHOTO_ERROR:
      return {
        ...state,
        photos: [],
        error: action.data
      };
    case USER_RECOVERED_ALBUM_ERROR:
      return {
        ...state,
        albmus: [],
        error: action.data
      };
    case USER_RECOVERED_COMMENTS_ERROR:
      return {
        ...state,
        comments: [],
        error: action.data
      };
    case USER_UPDATE_SUCCESS:
      localStorage.setItem("user", JSON.stringify(action.data));
      return {
        ...state,
        userData: { ...action.data }
      };
    case USER_UPDATE_FAILED:
      return { ...state, errors: action.data };
    case USER_PASSWORD_UPDATED:
      return { ...state };
    case USER_PASSWORD_UPDATE_FAILED:
      return { ...state };
    default:
      return { ...state };
  }
}
