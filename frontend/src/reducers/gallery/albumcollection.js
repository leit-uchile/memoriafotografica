import {
  ALBUM_LOADING,
  ALBUM_LOADED,
  ALBUM_LOADING_ERROR,
  CREATED_ALBUM,
  CREATE_ALBUM_SENT,
  CREATED_ALBUM_ERROR,
} from "../../actions/types";

const initialState = {
  albumData: {},
  loading: false,
  errors: [],
  createAlbum: {sent: false, success: false},
};

export default function albumcollection(state = initialState, action) {
  switch (action.type) {
    case ALBUM_LOADING:
      return { ...state, loading: true };
    case ALBUM_LOADED:
      return { ...state, loading: false, albumData: action.data };
    case ALBUM_LOADING_ERROR:
      return { ...state, loading: false, errors: action.data };
    case CREATE_ALBUM_SENT:
      return { ...state, createAlbum: { sent: false, success: false } };
    case CREATED_ALBUM:
      return { ...state, createAlbum: { sent: true, success: true } };
    case CREATED_ALBUM_ERROR:
      return { ...state, createAlbum: { sent: true, success: false } };
    default:
      return state;
  }
}
