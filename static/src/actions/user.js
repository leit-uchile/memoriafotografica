import {
  USER_RECOVERED_PHOTO,
  USER_RECOVERED_PHOTO_ERROR,
  USER_RECOVERED_ALBUM,
  USER_RECOVERED_ALBUM_ERROR,
  USER_RECOVERED_COMMENTS,
  USER_RECOVERED_COMMENTS_ERROR
} from "./types";
// TODO: Add real backend routes

export const getUserPhotos = (auth, user_id, limit, offset) => {
  return (dispatch, getState) => {
    let headers = {
      "Content-Type": "application/json",
      Authorization: "Token " + auth
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

export const getUserAlbums = (auth, user_id, limit, offset) => {
  return (dispatch, getState) => {
    let headers = {
      "Content-Type": "application/json",
      Authorization: "Token " + auth
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

export const getUserComments = (auth, user_id, limit, offset) => {
  return (dispatch, getState) => {
    let headers = {
      "Content-Type": "application/json",
      Authorization: "Token " + auth
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
