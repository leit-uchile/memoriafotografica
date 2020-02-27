import {
  RECOVERED_REPORT,
  EMPTY_REPORTS,
  RECOVERED_CATEGORIES,
  EMPTY_CATEGORIES,
  CREATED_CATEGORY,
  CREATED_CATEGORY_ERROR,
  RECOVERED_PHOTOS,
  EMPTY_PHOTOS,
  SWICH_PHOTO_APPROVAL,
  SWICH_PHOTO_APPROVAL_ERROR,
  CURADOR_LOADING,
  GET_GENERAL_STATS,
  GET_GENERAL_STATS_ERROR
} from "./types";

export const getReportes = () => {
  //GET REPORTES Y DENUNCIAS
  return (dispatch, getState) => {
    let headers = {
      Authorization: "Token " + getState().auth.token,
      "Content-Type": "application/json"
    };

    return fetch("/api/reports/", { method: "GET", headers: headers }).then(
      res => {
        if (res.status === 200) {
          return res.json().then(data => {
            dispatch({ type: RECOVERED_REPORT, data: data });
          });
        } else {
          dispatch({ type: EMPTY_REPORTS, data: res.data });
          throw res.data;
        }
      }
    );
  };
};

export const getCategories = () => {
  return (dispatch, getState) => {
    let headers = { "Content-Type": "application/json" };

    return fetch("/api/categories/", { method: "GET", headers: headers }).then(
      function(response) {
        const r = response;
        if (r.status === 200) {
          return r.json().then(data => {
            dispatch({ type: RECOVERED_CATEGORIES, data: data });
          });
        } else {
          dispatch({ type: EMPTY_CATEGORIES, data: r.data });
          throw r.data;
        }
      }
    );
  };
};

export const createCategory = data => (dispatch, getState) => {
  let headers = {
    Authorization: "Token " + getState().auth.token,
    "Content-Type": "application/json"
  };
  let sent_data = JSON.stringify(data);
  fetch("/api/categories/", {
    method: "POST",
    headers: headers,
    body: sent_data
  }).then(function(response) {
    const r = response;
    if (r.status === 200) {
      return r.json().then(data => {
        dispatch({ type: CREATED_CATEGORY, data: data });
      });
    } else {
      dispatch({ type: CREATED_CATEGORY_ERROR, data: r.data });
      throw r.data;
    }
  });
};

export const editCategory = () => {};

export const deleteCategories = (auth, catArray) => {
  return (dispatch, getState) => {
    const to_send = catArray.length;
    var completed_ok = 0;
    var completed_err = 0;
    dispatch({ type: CURADOR_LOADING, data: "" });
    catArray.forEach(e => {
      let headers = {
        Authorization: "Token " + auth,
        "Content-Type": "application/json"
      };
      fetch("/api/categories/" + e, {
        method: "DELETE",
        headers: headers
      }).then(response => {
        if (response.status === 204) {
          ++completed_ok;
        } else {
          ++completed_err;
        }
        if (completed_err + completed_ok === to_send) {
          dispatch({ type: "COMPLETED", data: "" });
          dispatch({ type: "REFRESH", data: "" });
          dispatch({ type: "DUMMY", data: "" });
        }
      });
    });
  };
};

export const getPhotos = auth => {
  return (dispatch, getState) => {
    let headers = {
      "Content-Type": "application/json",
      Authorization: "Token " + getState().auth.token
    };

    dispatch({ type: CURADOR_LOADING });

    return fetch("/api/photos/", { method: "GET", headers: headers }).then(
      function(response) {
        const r = response;
        if (r.status === 200) {
          return r.json().then(data => {
            dispatch({ type: RECOVERED_PHOTOS, data: data });
          });
        } else {
          dispatch({ type: EMPTY_PHOTOS, data: r.data });
          throw r.data;
        }
      }
    );
  };
};

export const switchPhotoApproval = (auth, photoID, curr_value) => (
  dispatch,
  getState
) => {
  let headers = {
    "Content-Type": "application/json",
    Authorization: "Token " + getState().auth.token
  };
  let sent_data = JSON.stringify({ approved: !curr_value });
  return fetch("/api/photos/" + photoID + "/", {
    method: "PUT",
    headers: headers,
    body: sent_data
  }).then(function(response) {
    const r = response;
    if (r.status === 200) {
      return r.json().then(data => {
        dispatch({ type: SWICH_PHOTO_APPROVAL, data: data });
      });
    } else {
      dispatch({ type: SWICH_PHOTO_APPROVAL_ERROR, data: r.data });
      throw r.data;
    }
  });
};

export const getGeneralStats = () => (dispatch, getState) => {
  try {
    let headers = {
      "Content-Type": "application/json",
      Authorization: "Token " + getState().auth.token
    };
    return fetch("/api/metrics/general/", {
      method: "GET",
      headers: headers
    }).then(response => {
      const r = response;
      if (r.status === 200) {
        return r.json().then(data => {
          dispatch({ type: GET_GENERAL_STATS, data: data });
        });
      } else {
        dispatch({ type: GET_GENERAL_STATS_ERROR, data: r.data });
        throw r.data;
      }
    });
  } catch (err) {
    dispatch({ type: GET_GENERAL_STATS_ERROR, data: "Error on general stats action" });
    throw err;
  }
};
