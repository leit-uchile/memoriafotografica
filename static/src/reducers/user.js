import {
  USER_RECOVERED_PHOTO_ERROR,
  USER_RECOVERED_PHOTO,
  USER_RECOVERED_ALBUM,
  USER_RECOVERED_COMMENTS,
  USER_RECOVERED_ALBUM_ERROR,
  USER_RECOVERED_COMMENTS_ERROR
} from "../actions/types";

const initialState = {
  photos: [],
  comments: [],
  albums: []
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case USER_RECOVERED_PHOTO:
      return {
        ...state,
        photos: action.data
      };
    case USER_RECOVERED_ALBUM:
      return {
        ...state,
        albmus: action.data
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
    default:
      return { ...state };
  }
}
