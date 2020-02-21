import {
  HOME_RECOVERED_PHOTOS,
  HOME_EMPTY_PHOTOS,
  HOME_RECOVERED_TAGS,
  HOME_EMPTY_TAGS,
  HOME_RECOVERED_CATEGORIES,
  HOME_EMPTY_CATEGORIES,
  HOME_RECOVERED_IPTCS,
  HOME_EMPTY_IPTCS,
  HOME_LOADING,
  HOME_SET_SELECTED_INDEX,
  HOME_PHOTO_PAGINATION
} from "./types";

/**
 * Recover photos without any filters or sorting options
 */
export const home = () => (dispatch, getState) => {
  let headers = { "Content-Type": "application/json" };

  dispatch({ type: HOME_LOADING, data: null });

  return fetch("/api/photos/", { method: "GET", headers: headers }).then(
    function(response) {
      const r = response;
      if (r.status === 200) {
        return r.json().then(data => {
          dispatch({ type: HOME_RECOVERED_PHOTOS, data: data });
        });
      } else {
        dispatch({ type: HOME_EMPTY_PHOTOS, data: r.data });
        throw r.data;
      }
    }
  );
};

/**
 * Recover all tags
 */
export const tags = () => (dispatch, getState) => {
  let headers = { "Content-Type": "application/json" };

  return fetch("/api/metadata/", { method: "GET", headers: headers }).then(
    function(response) {
      const r = response;
      if (r.status === 200) {
        return r.json().then(data => {
          dispatch({ type: HOME_RECOVERED_TAGS, data: data });
        });
      } else {
        dispatch({ type: HOME_EMPTY_TAGS, data: r.data });
        throw r.data;
      }
    }
  );
};

/**
 * Recover all categories
 */
export const categories = () => (dispatch, getState) => {
  let headers = { "Content-Type": "application/json" };

  return fetch("/api/categories/", { method: "GET", headers: headers }).then(
    function(response) {
      const r = response;
      if (r.status === 200) {
        return r.json().then(data => {
          dispatch({ type: HOME_RECOVERED_CATEGORIES, data: data });
        });
      } else {
        dispatch({ type: HOME_EMPTY_CATEGORIES, data: r.data });
        throw r.data;
      }
    }
  );
};

/**
 * Recover all IPTC Tags
 */
export const iptcs = () => (dispatch, getState) => {
  let headers = { "Content-Type": "application/json" };

  return fetch("/api/iptc-keyword/", {
    method: "GET",
    headers: headers
  }).then(function(response) {
    const r = response;
    if (r.status === 200) {
      return r.json().then(data => {
        dispatch({ type: HOME_RECOVERED_IPTCS, data: data });
      });
    } else {
      dispatch({ type: HOME_EMPTY_IPTCS, data: r.data });
      throw r.data;
    }
  });
};

/**
 * Recover photos using only field sorting
 * 
 * @param {String} field 
 * @param {String} order 
 */
export const sortByField = (field, order) => (dispatch, getState) => {
  if (order !== "asc" && order !== "desc") {
    return dispatch({ type: "EMPTY", data: "wrong order parameter" });
  }
  dispatch({ type: HOME_LOADING, data: null });

  let selected_meta = getState().search.metaIDs;
  let meta_text = selected_meta.length === 0 ? "" : `metadata=${selected_meta.map(m => m.metaID ).join()}&`

  fetch(`/api/photos/?${meta_text}sort=${field}-${order}`, { method: "GET" }).then(
    response => {
      const r = response;
      if (r.status === 200) {
        return r.json().then(data => {
          dispatch({ type: HOME_RECOVERED_PHOTOS, data: data });
        });
      } else {
        dispatch({ type: HOME_EMPTY_PHOTOS, data: r.data });
        throw r.data;
      }
    }
  );
};

/**
 * Recover photos using categories on the filter and sorting options
 * 
 * @param {Array} catIds 
 * @param {Object} pair like {field, order}
 */
export const recoverByCats = (catIds, pair) => (dispatch, getState) => {
  dispatch({ type: HOME_LOADING, data: null });

  let selected_meta = getState().search.metaIDs;
  let meta_text = selected_meta.length === 0 ? "" : `metadata=${selected_meta.map(m => m.metaID ).join()}&`

  fetch(`/api/photos/?${meta_text}category=${catIds.join(",")}&sort=${pair.field}-${pair.order}`, {
    method: "GET"
  }).then(response => {
    const r = response;
    if (r.status === 200) {
      return r.json().then(data => {
        dispatch({ type: HOME_RECOVERED_PHOTOS, data: data });
      });
    } else {
      dispatch({ type: HOME_EMPTY_PHOTOS, data: r.data });
      throw r.data;
    }
  });
};

/**
 * Set Photo to visualize over the search result by ID
 * @param {*} id 
 */
export const setSelectedId = id => (dispatch, getState) =>
  dispatch({ type: HOME_SET_SELECTED_INDEX, data: id });

/**
 * Set Number of page on PhotoDetails (persistent data)
 * @param {*} index 
 */
export const setPhotoPagination = index => dispatch =>
  dispatch({ type: HOME_PHOTO_PAGINATION, data: index})