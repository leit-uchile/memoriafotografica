import {
  ALBUM_LOADING,
  ALBUM_LOADED,
  ALBUM_LOADING_ERROR,
  CREATED_ALBUM,
  CREATE_ALBUM_SENT,
  CREATED_ALBUM_ERROR,
  DELETED_ALBUM,
  DELETE_ALBUM_SENT,
  DELETED_ALBUM_ERROR,
  EDITED_ALBUM,
  EDIT_ALBUM_SENT,
  EDITED_ALBUM_ERROR,
  ALBUMS_LOADED,
  ALBUMS_EMPTY,
} from "../../actions/types";

const initialState = {
  albumData: {},
  loading: false,
  errors: [],
  createAlbum: {sent: false, success: false},
  deleteAlbum: {sent: false, success: false},
  editAlbum: {sent: false, success: false},
  albums: {count: 0, results: []},
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
    case ALBUMS_LOADED:
      return { ...state, albums: action.data, loading: false}
    case ALBUMS_EMPTY:
      return { ...state, albums: {count: 0, results: []}, loading: false}
    case DELETE_ALBUM_SENT:
      return { ...state, deleteAlbum: {sent: false, success: false}};
    case DELETED_ALBUM:
      return { ...state, deleteAlbum: {sent: true, success: true}};
    case DELETED_ALBUM_ERROR:
      return { ...state, deleteAlbum: {sent: true, success: false}};
    case EDIT_ALBUM_SENT:
      return { ...state, editAlbum: {sent: false, success: false}};
    case EDITED_ALBUM:
      return { ...state, editAlbum: {sent: true, success: true}};
    case EDITED_ALBUM_ERROR:
      return { ...state, editAlbum: {sent: true, success: false}};
    default:
      return state;
  }
}
