import {
  ALBUM_LOADING,
  ALBUM_LOADED,
  ALBUM_LOADING_ERROR,
  CREATED_ALBUM,
  CREATE_ALBUM_SENT,
  CREATED_ALBUM_ERROR,
  ALBUMS_LOADED,
  ALBUMS_EMPTY,
} from "../../actions/types";

const initialState = {
  albumData: {},
  loading: false,
  errors: [],
  createAlbum: { sent: false, success: false },
  albums: { count: 0, results: [] },
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
      return { ...state, albums: action.data, loading: false };
    case ALBUMS_EMPTY:
      return { ...state, albums: { count: 0, results: [] }, loading: false };
    default:
      return state;
  }
}

export const selectAlbums = (state) => state.albumcollection.albums;

export const selectAlbumsLoading = (state) => state.albumcollection.loading;

export const selectAlbumsData = (state) => state.albumcollection.albumData;
