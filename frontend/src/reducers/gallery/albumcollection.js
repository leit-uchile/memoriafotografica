import {
  ALBUM_LOADING,
  ALBUM_LOADED,
  ALBUM_LOADING_ERROR,
  CREATED_ALBUM,
  CREATE_ALBUM_SENT,
  CREATED_ALBUM_ERROR,
  DELETED_ALBUM,
  DELETED_ALBUM_ERROR,
  EDITED_ALBUM,
  EDITED_ALBUM_ERROR,
  ALBUMS_LOADED,
  ALBUMS_EMPTY,
} from "../../actions/types";

const initialState = {
  albumData: { name: "", description: "", pictures: [] },
  loading: false,
  errors: [],
  createAlbum: { sent: false, success: false },
  deleteAlbum: { sent: false, success: false },
  albumUpdate: {},
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
    case DELETED_ALBUM:
      return { ...state, deleteAlbum: { sent: true, success: true } };
    case DELETED_ALBUM_ERROR:
      return { ...state, deleteAlbum: { sent: true, success: false } };
    case EDITED_ALBUM:
      return { ...state, editAlbum: action.data };
    case EDITED_ALBUM_ERROR:
      return { ...state, errors: [...state.errors, action.data] };
    default:
      return state;
  }
}

export const selectAlbums = (state) => state.albumcollection.albums;

export const selectAlbumsLoading = (state) => state.albumcollection.loading;

export const selectAlbumsData = (state) => state.albumcollection.albumData;

export const selectAlbumResult = (state) =>
  state.albumcollection.albums.results;

export const selectAlbumCollections = (state) => state.albumcollection;

export const selectAlbumCollectionAlbumData = (state) =>
  state.albumcollection.albumData;

export const selectAlbumAlbumUpdate = (state) =>
  state.albumcollection.albumUpdate;

export const selectAlbumDelete = (state) => state.albumcollection.deleteAlbum;
