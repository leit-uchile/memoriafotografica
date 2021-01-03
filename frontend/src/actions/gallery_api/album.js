import {
  ALBUMS_LOADED,
  ALBUMS_EMPTY,
  ALBUM_LOADED,
  ALBUM_LOADING_ERROR,
  ALBUM_LOADING,
  CREATE_ALBUM_SENT,
  CREATED_ALBUM,
  CREATED_ALBUM_ERROR,
  DELETED_ALBUM,
  DELETED_ALBUM_ERROR,
  EDITED_ALBUM,
  EDITED_ALBUM_ERROR,
} from '../types'
import { setAlert } from "../site_misc"

/**
 * Load Albums API with pages
 * @param {*} page starts at 0
 * @param {*} page_size defaults to 10
 * @param {*} params like collections or user 
 */
export const getAlbums = (page, page_size, params) => (dispatch) => {
  dispatch({ type: ALBUM_LOADING });
  return fetch(`/api/albums/?page=${page + 1}&page_size=${page_size}${params}`).then(
    (res) => {
      const response = res;
      if (res.status === 200) {
        return response
          .json()
          .then((parsed) => dispatch({ type: ALBUMS_LOADED, data: parsed }));
      } else {
        dispatch(setAlert("Hubo un error al cargar las colecciones/albumes", "warning"));
        dispatch({ type: ALBUMS_EMPTY, data: response.data });
      }
    }
  );
}

/**
 * Load information from an album by id
 * including the data from its pictures or not
 *
 * @param {Number} id
 * @param {Boolean} detailed
 */
export const loadAlbumInfo = (id, detailed) => (dispatch) => {
  dispatch({ type: ALBUM_LOADING });
  return fetch(`/api/albums/${id}/?detailed=${detailed ? "y" : "n"}`).then(
    (res) => {
      const response = res;
      if (res.status === 200) {
        return response
          .json()
          .then((parsed) => dispatch({ type: ALBUM_LOADED, data: parsed }));
      } else {
        dispatch(setAlert("Hubo un error al cargar la colección", "warning"));
        dispatch({ type: ALBUM_LOADING_ERROR, data: response.data });
      }
    }
  );
};


export const createAlbum = formData => (dispatch, getState) => {
  dispatch({ type: CREATE_ALBUM_SENT, data: null });
  let header = {
    Authorization: "Token " + getState().user.token,
    "Content-Type": "application/json"
  };
  return fetch("/api/albums/", {
    method: "POST",
    headers: header,
    body: JSON.stringify(formData)
  }).then((response) => {
    const res = response;
    if (res.status === 201) {
      dispatch({ type: CREATED_ALBUM, data: null });
    } else {
      dispatch(setAlert("Error al crear album", "warning"));
      res.json().then(payload => {
        dispatch({
          type: CREATED_ALBUM_ERROR,
          error: payload
        });
      });
    }
  })
    .catch(error => {
      dispatch(setAlert("Error al subir fotografia", "warning"));
      dispatch({
        type: CREATED_ALBUM_ERROR,
        error: error
      });
    });
};


export const deleteAlbum = albumId => (dispatch, getState) => {
  let header = {
    Authorization: "Token " + getState().user.token,
    "Content-Type": "application/json"
  };
  return fetch("/api/albums/" + albumId, {
    method: "DELETE",
    headers: header,
    body: {}
  }).then(res => {
    if (res.status === 204) {
      dispatch({
        type: DELETED_ALBUM,
        data: null
      })
    } else {
      dispatch(setAlert("Error al crear album", "warning"));
      res.json().then(payload => {
        dispatch({
          type: DELETED_ALBUM_ERROR,
          error: payload
        });
      });
    }
  })
}

export const editAlbum = (albumId, formData) => (dispatch, getState) => {
  let header = {
    Authorization: "Token " + getState().user.token,
    "Content-Type": "application/json"
  };
  return fetch("/api/albums/" + albumId + "/", {
    method: "PUT",
    headers: header,
    body: JSON.stringify(formData)
  }).then((response) => {
    const r = response;
    if (r.status === 200) {
      return r.json().then((data) => {
        dispatch(setAlert("Álbum actualizado exitosamente", "success"));
        dispatch({ type: EDITED_ALBUM, data: data });
      });
    } else {
      dispatch(setAlert("Error actualizando álbum. Intente nuevamente", "warning"));
      dispatch({ type: EDITED_ALBUM_ERROR, data: r.data });
      throw r.data;
    }
  })
}
