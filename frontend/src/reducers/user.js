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
  USER_PASSWORD_UPDATE_FAILED,
  USER_PUBLIC_LOADING,
  USER_PUBLIC_LOADED,
  USER_PUBLIC_ERROR,
  DELETED_PHOTO
} from "../actions/types";

/**
 * User will be loaded by the auth actions and dispatched here!
 * User deletion is done as a logout is successful
 */
const baseState = {
  photos: [],
  comments: [],
  albums: [],
  userData: null,
  publicLoading: false
};

// Compare if the token is valid (12 hours)
const initialState =
  localStorage.getItem("isAuth") === null
    ? baseState
    : new Date().getTime() -
        JSON.parse(localStorage.getItem("isAuth")).timeSet >
      43200000
    ? baseState
    : {
        photos: [],
        comments: [],
        albums: [],
        userData: JSON.parse(localStorage.getItem("user")),
        publicLoading: false
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
    case USER_PUBLIC_LOADING:
      return { ...state, publicLoading: true };
    case USER_PUBLIC_LOADED:
      return { ...state, publicLoading: false, publicUser: action.data };
    case USER_PUBLIC_ERROR:
      return { ...state, publicLoading: false, publicUser: null };
    case DELETED_PHOTO:
      let newList = []
      state.photos.forEach( photo =>{
        if(photo.id !== action.data.id){
          newList.push(photo)
        }
      })
      return { ...state, photos: [newList]};
    default:
      return { ...state };
  }
}
