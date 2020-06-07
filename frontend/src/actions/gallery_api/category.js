import {
  RECOVERED_CATEGORIES,
  EMPTY_CATEGORIES,
  CREATED_CATEGORY,
  CREATED_CATEGORY_ERROR,
  CURADOR_LOADING,
  CURADOR_REFRESH,
  CURADOR_COMPLETED,
  CATEGORY_RESET_ERRORS,
} from "../types";
import { setAlert } from "../site_misc";

/**
 * Recover categories using pagination
 * @param {Number} page
 * @param {Number} pageSize
 */
export const getCategories = (page = 0, pageSize = 6) => (dispatch) => {
  let headers = { "Content-Type": "application/json" };

  return fetch(`/api/categories/?page=${page + 1}&page_size=${pageSize}`, {
    method: "GET",
    headers: headers,
  }).then(function (response) {
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
  let sent_data = JSON.stringify(data);
  fetch("/api/categories/", {
    method: "POST",
    headers: headers,
    body: sent_data,
  }).then(function (response) {
    const r = response;
    if (r.status === 201) {
      dispatch(setAlert("Categoria creada", "success"));
      return r.json().then((data) => {
        dispatch({ type: CREATED_CATEGORY, data: data });
      });
    } else {
      dispatch(setAlert("Error al crear categoria", "danger"));
      dispatch({ type: CREATED_CATEGORY_ERROR, data: r.data });
      throw r.data;
    }
  });
};

export const resetErrors = () => (dispatch) =>
  dispatch({ type: CATEGORY_RESET_ERRORS });

export const editCategory = () => {};

export const deleteCategories = (catArray) => (dispatch, getState) => {
  const to_send = catArray.length;
  var completed_ok = 0;
  var completed_err = 0;
  dispatch({ type: CURADOR_LOADING, data: "" });
  catArray.forEach((e) => {
    let headers = {
      Authorization: "Token " + getState().user.token,
      "Content-Type": "application/json",
    };
    fetch("/api/categories/" + e, {
      method: "DELETE",
      headers: headers,
    }).then((response) => {
      if (response.status === 204) {
        ++completed_ok;
      } else {
        ++completed_err;
      }
      if (completed_err + completed_ok === to_send) {
        dispatch({ type: CURADOR_COMPLETED, data: "" });
        dispatch({ type: CURADOR_REFRESH, data: "" });
      }
    });
  });
};
