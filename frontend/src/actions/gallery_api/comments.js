import {
  RECOVERED_PHOTO_COMMENTS,
  PHOTO_COMMENTS_ERROR,
  CREATED_COMMENT,
  UPDATED_COMMENT,
  NEW_COMMENT_ERROR,
  DELETED_COMMENT,
  DELETE_COMMENT_ERROR,
  LOADING_COMMENT,
} from "../types";

export const getComments = (id) => (dispatch, getState) => {
  let headers = {
    Authorization: "Token " + getState().user.token,
    "Content-Type": "application/json",
  };

  return fetch(`/api/photos/${id}/comments/`, {
    method: "GET",
    headers: headers,
  }).then(function (response) {
    const r = response;
    if (r.status === 200) {
      return r.json().then((data) => {
        dispatch({ type: RECOVERED_PHOTO_COMMENTS, data: data.results });
      });
    } else {
      dispatch({ type: PHOTO_COMMENTS_ERROR, data: r.data });
      throw r.data;
    }
  });
};

export const putComment = (id, comment) => (dispatch, getState) => {
  let headers = {
    Authorization: "Token " + getState().user.token,
    "Content-Type": "application/json",
  };

  const user = getState().user.userData;

  dispatch({
    type: LOADING_COMMENT,
    data: { content: comment, usuario: { ...user } },
  });
  let jsonthing = JSON.stringify({ id: id, content: comment });

  return fetch(`/api/photos/${id}/comments/`, {
    method: "POST",
    headers: headers,
    body: jsonthing,
  }).then(function (response) {
    const r = response;
    if (r.status === 201) {
      return r.json().then((data) => {
        dispatch({ type: CREATED_COMMENT, data: data });
      });
    } else {
      dispatch({ type: NEW_COMMENT_ERROR, data: r.data });
      throw r.data;
    }
  });
};

export const editComment = (id, newContent) => (dispatch, getState) => {
  let headers = {
    Authorization: "Token " + getState().user.token,
    "Content-Type": "application/json",
  };

  //const user = getState().user.userData

  let jsonthing = JSON.stringify({ content: newContent });

  return fetch(`/api/comments/${id}/`, {
    method: "PUT",
    headers: headers,
    body: jsonthing,
  }).then(function (response) {
    const r = response;
    if (r.status === 200) {
      return r.json().then((data) => {
        dispatch({ type: UPDATED_COMMENT, data: data });
      });
    } else {
      dispatch({ type: NEW_COMMENT_ERROR, data: r.data });
      throw r.data;
    }
  });
};

export const deleteComment = (id) => (dispatch, getState) => {
  let headers = {
    Authorization: "Token " + getState().user.token,
    "Content-Type": "application/json",
  };

  return fetch(`/api/comments/${id}/`, {
    method: "DELETE",
    headers: headers,
  }).then(function (response) {
    const r = response;
    if (r.status === 204) {
      dispatch({ type: DELETED_COMMENT, data: id });
    } else {
      dispatch({ type: DELETE_COMMENT_ERROR, data: r.data });
      throw r.data;
    }
  });
};
