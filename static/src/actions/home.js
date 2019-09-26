import {
  HOME_RECOVERED_PHOTOS,
  HOME_EMPTY_PHOTOS,
  HOME_RECOVERED_TAGS,
  HOME_EMPTY_TAGS,
  HOME_RECOVERED_CATEGORIES,
  HOME_EMPTY_CATEGORIES,
  HOME_RECOVERED_IPTCS,
  HOME_EMPTY_IPTCS,
  HOME_LOADING
} from "./types";

export const home = () => (dispatch, getState) => {
  let headers = { "Content-Type": "application/json" };

  dispatch({type: HOME_LOADING, data: null});

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

export const sortByField = (field, order) => (dispatch, getState) => {
  if (order !== "asc" && order !== "desc") {
    return dispatch({ type: "EMPTY", data: "wrong order parameter" });
  }
  dispatch({type: HOME_LOADING, data: null});

  fetch(`/api/photos/?sort=${field}-${order}`, { method: "GET" }).then(
    response => {
      const r = response;
      if (r.status === 200) {
        return r.json().then(data => {
          dispatch({ type: "RECOVERED_PHOTO", data: data });
        });
      } else {
        dispatch({ type: "EMPTY", data: r.data });
        throw r.data;
      }
    }
  );
};

export const sortByUpload = order => (dispatch, getState) => {
  if (order !== "asc" && order !== "desc") {
    return dispatch({ type: "EMPTY", data: "wrong order parameter" });
  }
  dispatch({type: HOME_LOADING, data: null});

  fetch(`/api/photos/?sort=created_at-${order}`, { method: "GET" }).then(
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

export const recoverByCats = (catIds,order) => (dispatch, getState) => {
  dispatch({type: HOME_LOADING, data: null});
  fetch(`/api/photos/?category=${catIds.join(",")}&sort=created_at-${order}`, {method: "GET"}).then(
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
  )
};
