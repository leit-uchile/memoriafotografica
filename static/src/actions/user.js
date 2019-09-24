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
  USER_UPDATE_FAILED
} from "./types";
// TODO: Add real backend routes

export const getUserPhotos = (user_id, limit, offset) => {
  return (dispatch, getState) => {
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
};

export const getUserAlbums = (user_id, limit, offset) => {
  return (dispatch, getState) => {
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
};

export const getUserComments = (user_id, limit, offset) => {
  return (dispatch, getState) => {
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
};

export const loadUser = () => {
  return (dispatch, getState) => {
    dispatch({ type: "USER_LOADING" });

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
};

export const editProfile = user => {
  return (dispatch, getState) => {
    let headers = {
      "Content-Type": "application/json",
      Authorization: "Token " + getState().auth.token
    };
    let body = JSON.stringify({ user });

    return fetch(`api/users/${user.id}/`, { headers, body, method: "PUT" })
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
          return res.data;
        } else if (res.status === 403 || res.status === 401) {
          dispatch({ type: AUTH_ERROR, data: res.data });
          throw res.data;
        } else {
          dispatch({ type: USER_UPDATE_FAILED, data: res.data });
          throw res.data;
        }
      });
  };
};
