import {
  RECOVERED_PHOTOS,
  EMPTY_PHOTOS,
  PHOTO_RESET_NB_OPS,
  EDIT_PHOTO_UPDATING,
  EDIT_PHOTO,
  EDIT_PHOTO_ERROR,
  DELETED_PHOTO,
  PHOTO_DETAILS_LOADING,
  PHOTO_DETAILS_LOADED,
  PHOTO_DETAILS_ERROR,
  UPLOADED_PHOTO,
  ERROR_UPLOADING_PHOTO,
  UPLOADING,
  HOME_LOADING,
  HOME_LOADED,
  HOME_PHOTO_PAGINATION,
  UPDATED_CATEGORY_PHOTOS,
  UPDATED_CATEGORY_PHOTOS_ERROR,
} from "../types";
import { setAlert } from "../site_misc";

/**
 * Recover photos without any filters or sorting options
 * @param {Number} page
 * @param {Number} pageSize
 */
export const home = (page = 0, pageSize = 200) => (dispatch, getState) => {
  let headers = { "Content-Type": "application/json" };
  dispatch({ type: HOME_LOADING, data: null });
  return fetch(`/api/photos/?page=${page + 1}&page_size=${pageSize}`, {
    method: "GET",
    headers: headers,
  }).then(function (response) {
    const r = response;
    if (r.status === 200) {
      return r.json().then((data) => {
        dispatch({ type: RECOVERED_PHOTOS, data: data });
        dispatch({ type: HOME_LOADED });
      });
    } else {
      dispatch({ type: EMPTY_PHOTOS, data: r.data });
      dispatch({ type: HOME_LOADED });
    }
  });
};

/**
 * Recover photos for the curador view.
 *
 * Find Photos using query params for tags, title, desc, upload_date, created_on
 * @param {Number} page
 * @param {Number} pageSize
 * @param {String} search query text
 */
export const getPhotosAuth = (page = 0, pageSize = 25, search = "") => (
  dispatch,
  getState
) => {
  let headers = {
    "Content-Type": "application/json",
    Authorization: "Token " + getState().user.token,
  };
  let url = `/api/photos/?page=${page + 1}&page_size=${pageSize}`;
  if (search !== "") {
    url = url + search;
  }
  return fetch(url, {
    method: "GET",
    headers: headers,
  }).then(function (response) {
    const r = response;
    if (r.status === 200) {
      return r.json().then((data) => {
        dispatch({ type: RECOVERED_PHOTOS, data: data });
      });
    } else {
      dispatch({ type: EMPTY_PHOTOS, data: r.data });
    }
  });
};

/**
 * Add/Remove Category to photos
 * @param {*} photoIds
 * @param {*} catId
 * @param {*} action like add or remove
 */
export const associateCategory = (photoIds, catId, action = "add") => (
  dispatch,
  getState
) => {
  let headers = {
    "Content-Type": "application/json",
    Authorization: "Token " + getState().user.token,
  };
  let sent_data = JSON.stringify({ ids: photoIds, action });
  fetch(`/api/photos/category/${catId}/`, {
    method: "POST",
    headers: headers,
    body: sent_data,
  }).then(function (response) {
    const r = response;
    if (r.status === 200) {
      dispatch(
        setAlert(
          `Fotos ${action === "add" ? "agregadas a" : "eliminadas de la "
          } categoria`,
          "success"
        )
      );
      dispatch({ type: UPDATED_CATEGORY_PHOTOS });
    } else {
      dispatch(
        setAlert(
          "No se ha podido actualizar la información. Inténtelo nuevamente",
          "warning"
        )
      );
      dispatch({ type: UPDATED_CATEGORY_PHOTOS_ERROR, data: photoIds });
    }
  });
};

/**
 * When doing multiple operations set number of ops
 * for completion checking and error catching
 */
export const setNBOps = (num) => (dispatch) =>
  dispatch({ type: PHOTO_RESET_NB_OPS, data: num });

export const editPhoto = (photoID, newData) => (dispatch, getState) => {
  let headers = {
    "Content-Type": "application/json",
    Authorization: "Token " + getState().user.token,
  };
  dispatch({ type: EDIT_PHOTO_UPDATING})
  return fetch("/api/photos/" + photoID + "/", {
    method: "PUT",
    headers: headers,
    body: JSON.stringify(newData),
  }).then((response) => {
    const r = response;
    if (r.status === 200) {
      return r.json().then((data) => {
        dispatch({ type: EDIT_PHOTO, data: data });
        dispatch(setAlert("Fotografía actualizada exitosamente", "success"));
      });
    } else {
      dispatch({ type: EDIT_PHOTO_ERROR, data: r.data });
      dispatch(setAlert("Error actualizando fotografía. Intente nuevamente", "warning"));
      throw r.data;
    }
  });
};

export const deletePhoto = (photoID) => (dispatch, getState) => {
  let headers = {
    Authorization: "Token " + getState().user.token,
    "Content-Type": "application/json",
  };
  dispatch({ type: EDIT_PHOTO_UPDATING})
  return fetch("/api/photos/" + photoID + "/", {
    method: "DELETE",
    headers: headers,
  }).then((response) => {
    const r = response;
    if (r.status === 204) {
      dispatch({ type: DELETED_PHOTO, data: photoID });
      dispatch(setAlert("Fotografía eliminada exitosamente", "success"));
    } else {
      dispatch({ type: EDIT_PHOTO_ERROR, data: r.data });
      dispatch(setAlert("Error eliminando fotografía. Intente nuevamente", "warning"));
      throw r.data;
    }
  });
};

/**
 * Recover photos using only field sorting
 *
 * @param {String} field
 * @param {String} order
 * @param {Number} page
 * @param {Number} pageSize
 */
export const sortByField = (field, order, page, pageSize = 25) => (
  dispatch,
  getState
) => {
  if (order !== "asc" && order !== "desc") {
    return dispatch({ type: "EMPTY", data: "wrong order parameter" });
  }
  dispatch({ type: HOME_LOADING, data: null });

  let selected_meta = getState().site_misc.searchMetaIDs;
  let meta_text =
    selected_meta.length === 0
      ? ""
      : `metadata=${selected_meta.map((m) => m.metaID).join()}&`;

  fetch(
    `/api/photos/?${meta_text}sort=${field}-${order}&page=${page + 1
    }&page_size=${pageSize}`,
    {
      method: "GET",
    }
  ).then((response) => {
    const r = response;
    if (r.status === 200) {
      return r.json().then((data) => {
        dispatch({ type: RECOVERED_PHOTOS, data: data });
        dispatch({ type: HOME_LOADED });
      });
    } else {
      dispatch({ type: EMPTY_PHOTOS, data: r.data });
      dispatch({ type: HOME_LOADED });
      throw r.data;
    }
  });
};

/**
 * Recover photos using categories on the filter and sorting options
 *
 * @param {Array} catIds
 * @param {Object} pair like {field, order}
 * @param {Number} page
 * @param {Number} pageSize
 */
export const recoverByCats = (catIds, pair, page, pageSize = 25) => (
  dispatch,
  getState
) => {
  dispatch({ type: HOME_LOADING, data: null });

  let selected_meta = getState().site_misc.searchMetaIDs;
  let meta_text =
    selected_meta.length === 0
      ? ""
      : `metadata=${selected_meta.map((m) => m.metaID).join()}&`;

  fetch(
    `/api/photos/?${meta_text}category=${catIds.join(",")}&sort=${pair.field}-${pair.order
    }&page=${page + 1}&page_size=${pageSize}`,
    {
      method: "GET",
    }
  ).then((response) => {
    const r = response;
    if (r.status === 200) {
      return r.json().then((data) => {
        dispatch({ type: RECOVERED_PHOTOS, data: data });
        dispatch({ type: HOME_LOADED });
      });
    } else {
      dispatch({ type: EMPTY_PHOTOS, data: r.data });
      dispatch({ type: HOME_LOADED });
      throw r.data;
    }
  });
};

export const getPhoto = (id) => (dispatch, getState) => {
  let isAuth = getState().user.isAuthenticated;
  let headers = !isAuth
    ? { "Content-Type": "application/json" }
    : {
      "Content-Type": "application/json",
      Authorization: "Token " + getState().user.token,
    };
  dispatch({ type: PHOTO_DETAILS_LOADING })
  return fetch(`/api/photos/${id}`, { method: "GET", headers: headers }).then(
    function (response) {
      const r = response;
      if (r.status === 200) {
        return r.json().then((data) => {
          dispatch({ type: PHOTO_DETAILS_LOADED, data: data });
        });
      } else {
        dispatch({ type: PHOTO_DETAILS_ERROR, data: r.status });
        throw r.data;
      }
    }
  );
};

/**
 * When uploading each photo will reduce to success or error.
 * In case of error the payload will contain the id for
 * user feedback (and posibly relaunch)
 *
 * @param {Array} photos
 * Each photo has a shape of
 * - photo: File
 * - meta: title, description, aspect_h, aspect_w, cc, tags
 * - date
 *
 * NOTE: Previously data was reprocessed and modifed on this function.
 * We now expect data as is
 */
export const uploadImages = (photos, token = null) => (dispatch, getState) => {
  let header = token === null ? {Authorization: "Token " + getState().user.token} : {Authorization: "Token " + token}

  dispatch({ type: UPLOADING, data: photos.length });

  const funcs = photos.map((photo, key) => () => {
    let formData = new FormData();
    // If no title available create one for our date
    formData.append("title", photo.meta.title ? photo.meta.title : "");
    formData.append("description", photo.meta.description);
    formData.append("aspect_h", photo.meta.aspect_h);
    formData.append("aspect_w", photo.meta.aspect_w);
    formData.append("image", photo.photo);
    // Date photos were taken
    formData.append("upload_date", photo.meta.date + "T00:00");
    formData.append("permission", photo.meta.cc);
    photo.meta.tags.length >= 1 && formData.append("metadata", photo.meta.tags);

    const this_key = key; // avoid binding bellow
    fetch("/api/photos/", {
      method: "POST",
      headers: header,
      body: formData,
    })
      .then(function (response) {
        const r = response;
        if (r.status === 201) {
          r.json().then((payload) => {
            dispatch({
              type: UPLOADED_PHOTO,
              data: {
                photo_index: this_key,
                photo_id: payload.id,
              },
            });
          });
        } else {
          dispatch(setAlert("Error al subir fotografia", "warning"));

          dispatch({
            type: ERROR_UPLOADING_PHOTO,
            data: {
              photo_index: this_key,
            },
          });
        }
      })
      .catch((error) => {
        dispatch(setAlert("Error al subir fotografia", "warning"));
        dispatch({
          type: ERROR_UPLOADING_PHOTO,
          data: {
            photo_index: this_key,
            response: error,
          },
        });
      });
  });

  const callWithTimeout = (id, list) => {
    if (id !== list.length) {
      list[id]();
      setTimeout(() => callWithTimeout(id + 1, list), 1000);
    }
  };

  callWithTimeout(0, funcs);
};

/**
 * Do a query with params and recover the position of our photo id within
 * the results
 * @param {Number} id
 * @param {Number} pageSize
 * @param {String} params
 */
export const findPhotoQueryPage = (id, pageSize, params) => (dispatch) => {
  let headers = { "Content-Type": "application/json" };
  fetch(`/api/photos/${params}&page_size=${pageSize}&get_page=${id}`, {
    method: "GET",
    headers,
  }).then((response) => {
    const r = response;
    if (r.status === 200) {
      return r.json().then((data) => {
        dispatch({ type: HOME_PHOTO_PAGINATION, data: data });
      });
    } else {
      throw r.data;
    }
  });
};

/**
 * Find the page of our photo in a list
 * @param {Number} pageSize
 * @param {String} params
 */
export const photoQuerySuggestions = (page = 0, pageSize = 10, params) => (
  dispatch
) => {
  let headers = { "Content-Type": "application/json" };
  fetch(`/api/photos/${params}&page_size=${pageSize}&page=${page + 1}`, {
    method: "GET",
    headers,
  }).then((response) => {
    const r = response;
    if (r.status === 200) {
      return r.json().then((data) => {
        dispatch({ type: RECOVERED_PHOTOS, data: data });
      });
    } else {
      dispatch({ type: EMPTY_PHOTOS });
      throw r.data;
    }
  });
};
