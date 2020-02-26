import {
  USER_RECOVERED_PHOTO,
  USER_RECOVERED_PHOTO_ERROR,
  USER_RECOVERED_ALBUM,
  USER_RECOVERED_ALBUM_ERROR,
  USER_RECOVERED_COMMENTS,
  USER_RECOVERED_COMMENTS_ERROR,
  USER_LOADED,
  AUTH_ERROR,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAILED,
  USER_PASSWORD_UPDATED,
  USER_PASSWORD_UPDATE_FAILED,
  USER_PUBLIC_LOADING,
  USER_PUBLIC_LOADED,
  USER_PUBLIC_ERROR
} from "./types";
// TODO: Add real backend routes

import { setAlert } from "./alert";

export const getUserPhotos = (user_id, limit, offset) => (
  dispatch,
  getState
) => {
  let headers = {
    "Content-Type": "application/json",
    Authorization: "Token " + getState().auth.token
  };
  return fetch(
    `/api/users/photos/${user_id}/?limit=${limit}&offset=${offset}`,
    { method: "GET", headers: headers }
  ).then(function(response) {
    const r = response;
    if (r.status === 200) {
      return r.json().then(data => {
        dispatch({ type: USER_RECOVERED_PHOTO, data: data.photos });
      });
    } else {
      dispatch({ type: USER_RECOVERED_PHOTO_ERROR, data: r.data });
      throw r.data;
    }
  });
};

export const getUserAlbums = (user_id, limit, offset) => (
  dispatch,
  getState
) => {
  let headers = {
    "Content-Type": "application/json",
    Authorization: "Token " + getState().auth.token
  };
  return fetch(
    `/api/users/albums/${user_id}/?limit=${limit}&offset=${offset}`,
    { method: "GET", headers: headers }
  ).then(function(response) {
    const r = response;
    if (r.status === 200) {
      return r.json().then(data => {
        dispatch({ type: USER_RECOVERED_ALBUM, data: data.albums });
      });
    } else {
      dispatch({ type: USER_RECOVERED_ALBUM_ERROR, data: r.data });
      throw r.data;
    }
  });
};

export const getUserComments = (user_id, limit, offset) => (
  dispatch,
  getState
) => {
  let headers = {
    "Content-Type": "application/json",
    Authorization: "Token " + getState().auth.token
  };
  return fetch(
    `/api/users/comments/${user_id}/?limit=${limit}&offset=${offset}`,
    { method: "GET", headers: headers }
  ).then(function(response) {
    const r = response;
    if (r.status === 200) {
      return r.json().then(data => {
        dispatch({ type: USER_RECOVERED_COMMENTS, data: data.comments });
      });
    } else {
      dispatch({ type: USER_RECOVERED_COMMENTS_ERROR, data: r.data });
      throw r.data;
    }
  });
};

/**
 * Load a user by ID if it is public
 */
export const loadAUser = id => dispatch => {
  dispatch({ type: USER_PUBLIC_LOADING });
  return fetch(`/api/users/${id}/`)
    .then(res => {
      const response = res;
      if (res.status < 500) {
        return response.json().then(data => {
          return { status: res.status, data };
        });
      } else {
        console.log("Server Error!");
        dispatch({ type: USER_PUBLIC_ERROR, data: res.data });
        throw res;
      }
    })
    .then(res => {
      if (res.status === 200) {
        dispatch({ type: USER_PUBLIC_LOADED, data: res.data });
        return res.data;
      } else if (res.status >= 400 && res.status < 500) {
        dispatch({ type: USER_PUBLIC_ERROR, data: res.data });
        throw res.data;
      }
    });
};

/**
 * Load current user
 */
export const loadUser = () => (dispatch, getState) => {
  const token = getState().auth.token;

  let headers = {
    "Content-Type": "application/json"
  };

  if (token) {
    headers["Authorization"] = `Token ${token}`;
  }
  return fetch("/api/auth/user/", { headers })
    .then(res => {
      if (res.status < 500) {
        return res.json().then(data => {
          return { status: res.status, data };
        });
      } else {
        console.log("Server Error!");
        throw res;
      }
    })
    .then(res => {
      if (res.status === 200) {
        dispatch({ type: USER_LOADED, user: res.data });
        return res.data;
      } else if (res.status >= 400 && res.status < 500) {
        dispatch({ type: AUTH_ERROR, data: res.data });
        throw res.data;
      }
    });
};

/**
 * Update profile using JSON or FormData Multipart
 * @param {*} user
 * @param {bool} doJSON
 */
export const editProfile = (user, doJSON = true) => (dispatch, getState) => {
  let headers, body;

  if (doJSON) {
    headers = {
      "Content-Type": "application/json",
      Authorization: "Token " + getState().auth.token
    };
    body = JSON.stringify({ ...user });
  } else {
    // Assume multipart from backend
    headers = {
      Authorization: "Token " + getState().auth.token
    };
    body = new FormData();
    Object.keys(user).forEach(element => {
      body.append(element, user[element]);
    });
  }

  return fetch(`/api/users/${user.id}/`, { headers, body, method: "PUT" })
    .then(res => {
      if (res.status < 500) {
        return res.json().then(data => {
          return { status: res.status, data };
        });
      } else {
        console.log("Server Error!");
        throw res;
      }
    })
    .then(res => {
      if (res.status === 200) {
        dispatch({ type: USER_UPDATE_SUCCESS, data: res.data });
        dispatch(setAlert("Perfil actualizado", "success"));
      } else if (res.status === 403 || res.status === 401) {
        dispatch({ type: AUTH_ERROR, data: res.data });
        throw res.data;
      } else {
        dispatch({ type: USER_UPDATE_FAILED, data: res.data });
        throw res.data;
      }
    });
};

/**
 * Update users password using providing the old password
 * to the backend
 * @param {string} old_password
 * @param {string} new_password
 */
export const updatePassword = (old_password, new_password) => (
  dispatch,
  getState
) => {
  let headers = {
    "Content-Type": "application/json",
    Authorization: "Token " + getState().auth.token
  };

  let body = JSON.stringify({ old_password, new_password });

  return fetch("/api/auth/password/", { headers, body, method: "PUT" })
    .then(res => {
      if (res.status < 500) {
        if (res.status !== 200) {
          return res.json().then(data => {
            return { status: res.status, data };
          });
        } else {
          return { status: res.status, data: null };
        }
      } else {
        console.log("Server Error!");
        dispatch(setAlert("Error en el servidor", "warning"));
        throw res;
      }
    })
    .then(res => {
      // Response is NO CONTENT
      if (res.status === 200) {
        dispatch({ type: USER_PASSWORD_UPDATED, data: res.data });
        return res.data;
      } else if (res.status === 403 || res.status === 401) {
        dispatch({ type: AUTH_ERROR, data: res.data });
        dispatch(
          setAlert(
            "Sesion invalida, por favor ingrese nuevamente al sistema",
            "warning"
          )
        );
        throw res.data;
      } else {
        dispatch({ type: USER_PASSWORD_UPDATE_FAILED, data: res.data });
        dispatch(setAlert(`Error: ${res.data}`, "warning"));
        throw res.data;
      }
    });
};

export const uploadUserPicture = avatar => (dispatch, getState) => {};
