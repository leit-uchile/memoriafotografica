import {
  ALBUM_LOADING,
  ALBUM_LOADED,
  ALBUM_LOADING_ERROR
} from "../actions/types";

const initialState = {
  albumData: {},
  loading: false,
  errors: []
};

export default function albumcollection(state = initialState, action) {
  switch (action.type) {
    case ALBUM_LOADING:
      return { ...state, loading: true };
    case ALBUM_LOADED:
      return { ...state, loading: false, albumData: action.data };
    case ALBUM_LOADING_ERROR:
      return { ...state, loading: false, errors: action.data };
    default:
      return state;
  }
}
