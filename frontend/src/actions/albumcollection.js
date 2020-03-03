import {
  ALBUM_LOADED,
  ALBUM_LOADING_ERROR,
  ALBUM_LOADING,
} from "./types";
import { setAlert } from "./alert";

/**
 * Load information from an album by id
 * including the data from its pictures or not
 *
 * @param {Number} id
 * @param {Boolean} detailed
 */
export const loadAlbumInfo = (id, detailed) => dispatch => {
  dispatch({ type: ALBUM_LOADING });
  return fetch(`/api/albums/${id}/?detailed=${detailed ? "y" : "n"}`).then(
    res => {
      const response = res;
      if (res.status === 200) {
        return response
          .json()
          .then(parsed => dispatch({ type: ALBUM_LOADED, data: parsed }));
      } else {
        dispatch(setAlert("Hubo un error al cargar la colección", "warning"));
        dispatch({ type: ALBUM_LOADING_ERROR, data: response.data });
      }
    }
  );
};