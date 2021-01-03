import {
  RECOVERED_CATEGORIES,
  EMPTY_CATEGORIES,
  CREATED_CATEGORY,
  CREATED_CATEGORY_ERROR,
  CATEGORY_RESET_ERRORS,
  UPDATED_CATEGORY,
  UPDATED_CATEGORY_ERROR,
  RECOVERED_CATEGORY,
  RECOVERED_CATEGORY_ERROR,
  DELETED_CATEGORY,
  DELETED_CATEGORY_ERROR,
} from "../types";
import { setAlert } from "../site_misc";

/**
 * Recover categories using pagination
 * @param {Number} page
 * @param {Number} pageSize
 * @param {String} extra params
 */
export const getCategories = (page = 0, pageSize = 6, extra = "") => (
  dispatch
) => {
  let headers = { "Content-Type": "application/json" };

  return fetch(
    `/api/categories/?page=${page + 1
    }&page_size=${pageSize}&sort=updated_at-desc${extra}`,
    {
      method: "GET",
      headers: headers,
    }
  ).then(function (response) {
    const r = response;
    if (r.status === 200) {
      return r.json().then((data) => {
        dispatch({ type: RECOVERED_CATEGORIES, data: data });
      });
    } else {
      dispatch({ type: EMPTY_CATEGORIES, data: r.data });
      throw r.data;
    }
  });
};

export const createCategory = (data) => (dispatch, getState) => {
  let headers = {
    Authorization: "Token " + getState().user.token,
    "Content-Type": "application/json",
  };
  return fetch("/api/categories/", {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data),
  }).then((response) => {
    const r = response;
    if (r.status === 201) {
      return r.json().then((data) => {
        dispatch(setAlert("Categoria creada exitosamente", "success"));
        dispatch({ type: CREATED_CATEGORY, data: data });
      });
    } else {
      dispatch(setAlert("Error creando categoria. Intente nuevamente", "warning"));
      dispatch({ type: CREATED_CATEGORY_ERROR, data: r.data });
      throw r.data;
    }
  });
};

/**
 * Get Category Details
 * @param {*} id
 */
export const getCategory = (id) => (dispatch, getState) => {
  let headers = {
    Authorization: "Token " + getState().user.token,
  };
  fetch(`/api/categories/${id}/`, {
    headers: headers,
  }).then(function (response) {
    const r = response;
    if (r.status === 200) {
      return r.json().then((data) => {
        dispatch({ type: RECOVERED_CATEGORY, data: data });
      });
    } else {
      dispatch({ type: RECOVERED_CATEGORY_ERROR, data: r.data });
      throw r.data;
    }
  });
};

export const resetErrors = () => (dispatch) =>
  dispatch({ type: CATEGORY_RESET_ERRORS });

/**
 * Update name, photos of a category
 * @param {Object} data
 */
export const updateCategory = (data) => (dispatch, getState) => {
  let headers = {
    Authorization: "Token " + getState().user.token,
    "Content-Type": "application/json",
  };
  return fetch(`/api/categories/${data.id}/`, {
    method: "PUT",
    headers: headers,
    body: JSON.stringify(data),
  }).then((response) => {
    const r = response;
    if (r.status === 200) {
      return r.json().then((data) => {
        dispatch(setAlert("Categoria modificada exitosamente", "success"));
        dispatch({ type: UPDATED_CATEGORY, data: data });
      });
    } else {
      dispatch(setAlert("Error modificando categoria. Intente nuevamente", "warning"));
      dispatch({ type: UPDATED_CATEGORY_ERROR, data: r.data });
      throw r.data;
    }
  });
};

export const deleteCategories = (id) => (dispatch, getState) => {
  let headers = {
    Authorization: "Token " + getState().user.token,
    "Content-Type": "application/json",
  };
  return fetch(`/api/categories/${id}`, {
    method: "DELETE",
    headers: headers,
  }).then((response) => {
    const r = response;
    if (r.status === 204) {
      dispatch(setAlert("Categoria eliminada exitosamente", "success"));
      dispatch({ type: DELETED_CATEGORY, data: id });
    } else {
      dispatch(setAlert("Error eliminando categoria. Intente nuevamente", "warning"));
      dispatch({ type: DELETED_CATEGORY_ERROR, data: id });
    }
  });
};

/**
 * When doing multiple operations set number of ops
 * for completion checking and error catching
 */
export const setNBOps = (num) => (dispatch) =>
  dispatch({ type: CATEGORY_RESET_ERRORS, data: num });
