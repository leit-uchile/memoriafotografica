import {
  RECOVERED_PHOTOS,
  EMPTY_PHOTOS,
  EDIT_PHOTO,
  DELETED_PHOTO,
  EDIT_PHOTO_ERROR,
  RECOVERED_PHOTO_DETAILS,
  PHOTO_DETAILS_ERROR,
  UPLOADED_PHOTO,
  ERROR_UPLOADING_PHOTO,
  UPLOADING,
  CURADOR_LOADING,
  CURADOR_COMPLETED,
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
      throw r.data;
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

  dispatch({ type: CURADOR_LOADING });

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
        dispatch({ type: CURADOR_COMPLETED });
      });
    } else {
      dispatch({ type: EMPTY_PHOTOS, data: r.data });
      dispatch({ type: CURADOR_COMPLETED });
      throw r.data;
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
          `Fotos ${
            action === "add" ? "agregadas a" : "eliminadas de la "
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
      throw r.data;
    }
  });
};

export const editPhoto = (photoID, newData) => (dispatch, getState) => {
  let headers = {
    "Content-Type": "application/json",
    Authorization: "Token " + getState().user.token,
  };
  let sent_data = JSON.stringify(newData);
  return fetch("/api/photos/" + photoID + "/", {
    method: "PUT",
    headers: headers,
    body: sent_data,
  }).then(function (response) {
    const r = response;
    if (r.status === 200) {
      return r.json().then((data) => {
        dispatch(setAlert("Se ha(n) editado con éxito", "success"));
        dispatch({ type: EDIT_PHOTO, data: data });
      });
    } else {
      dispatch(
        setAlert(
          "Hubo un error al editar la(s) fotografia(s). Intente nuevamente",
          "warning"
        )
      );
      dispatch({ type: EDIT_PHOTO_ERROR, data: r.data });
      throw r.data;
    }
  });
};

export const deletePhoto = (photoID) => (dispatch, getState) => {
  let headers = {
    Authorization: "Token " + getState().user.token,
    "Content-Type": "application/json",
  };

  return fetch("/api/photos/" + photoID + "/", {
    method: "DELETE",
    headers: headers,
  }).then(function (response) {
    const r = response;
    if (r.status === 204) {
      dispatch(setAlert("Se ha(n) borrado con éxito", "success"));
      dispatch({ type: DELETED_PHOTO, data: photoID });
    } else {
      dispatch(
        setAlert(
          "Hubo un error al borrar la(s) fotografia(s). Intente nuevamente",
          "warning"
        )
      );
      dispatch({ type: EDIT_PHOTO_ERROR, data: r.data });
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
    `/api/photos/?${meta_text}sort=${field}-${order}&page=${
      page + 1
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
    `/api/photos/?${meta_text}category=${catIds.join(",")}&sort=${pair.field}-${
      pair.order
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

  return fetch(`/api/photos/${id}`, { method: "GET", headers: headers }).then(
    function (response) {
      const r = response;
      if (r.status === 200) {
        return r.json().then((data) => {
          dispatch({ type: RECOVERED_PHOTO_DETAILS, data: data });
        });
      } else {
        dispatch({ type: PHOTO_DETAILS_ERROR, data: r.status });
        throw r.data;
      }
    }
  );
};
/* When uploading each photo will reduce to success or error.
  In case of error the payload will contain the id for
  user feedback (and posibly relaunch)

  photos : {
    photoList: Array,
    cc: String
  }
*/
export const uploadImages = (photos, photo_meta) => {
  return (dispatch, getState) => {
    let header = {
      Authorization: "Token " + getState().user.token,
    };

    // var currentTime = new Date();
    // // Bug: January is 0
    // currentTime = `${currentTime.getDate()}-${
    //   currentTime.getMonth() + 1
    // }-${currentTime.getFullYear()}`;

    dispatch({ type: UPLOADING, data: photos.length });

    const funcs = photos.map((photo, key) => () => {
      let formData = new FormData();
      // If no title available create one for our date
      formData.append(
        "title",
        photo.meta.title
          ? photo.meta.title
          : ""
      );
      formData.append("description", photo.meta.description);
      formData.append("aspect_h", photo.meta.aspect_h);
      formData.append("aspect_w", photo.meta.aspect_w);
      formData.append("image", photo.photo);
      // Send our permissions
      formData.append(
        "permission",
        photo.meta.cc !== null ? photo.meta.cc : photo_meta.cc ? photo_meta.cc : "CC BY"
      );
      // Date photos were taken
      formData.append("upload_date", photo_meta.date + "T00:00");

      // Add metadata in format 1,2,4 string
      if (photo.meta.tags.length !== 0) {
        formData.append("metadata", photo.meta.tags);
      }

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
