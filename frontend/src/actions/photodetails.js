import {
  RECOVERED_PHOTO_DETAILS,
  PHOTO_DETAILS_ERROR,
  RECOVERED_PHOTO_COMMENTS,
  PHOTO_COMMENTS_ERROR,
  CREATED_COMMENT,
  NEW_COMMENT_ERROR,
  CUSTOM_METADATA_ERROR,
  LOADED_CUSTOM_METADATA,
  REPORTED_PHOTO,
  PHOTO_REPORT_FAILED,
  REPORTING_PHOTO,
} from "./types";

export const getPhoto = id => {
  return (dispatch, getState) => {
    let headers = { "Content-Type": "application/json" };

    return fetch(`/api/photos/${id}`, { method: "GET", headers: headers }).then(
      function(response) {
        const r = response;
        if (r.status === 200) {
          return r.json().then(data => {
            dispatch({ type: RECOVERED_PHOTO_DETAILS, data: data });
          });
        } else {
          dispatch({ type: PHOTO_DETAILS_ERROR, data: r.data });
          throw r.data;
        }
      }
    );
  };
};

export const getComments = id => {
  return (dispatch, getState) => {
    let headers = {
      Authorization: "Token " + getState().auth.token,
      "Content-Type": "application/json"
    };

    return fetch(`/api/photos/${id}/comments/`, {
      method: "GET",
      headers: headers
    }).then(function(response) {
      const r = response;
      if (r.status === 200) {
        return r.json().then(data => {
          dispatch({ type: RECOVERED_PHOTO_COMMENTS, data: data });
        });
      } else {
        dispatch({ type: PHOTO_COMMENTS_ERROR, data: r.data });
        throw r.data;
      }
    });
  };
};

export const putComment = (id, comment) => {
  return (dispatch, getState) => {
    let headers = {
      Authorization: "Token " + getState().auth.token,
      "Content-Type": "application/json"
    };

    let jsonthing = JSON.stringify({ id: id, content: comment });

    return fetch(`/api/photos/${id}/comments/`, {
      method: "POST",
      headers: headers,
      body: jsonthing
    }).then(function(response) {
      const r = response;
      if (r.status === 201) {
        return r.json().then(data => {
          dispatch({ type: CREATED_COMMENT, data: data });
        });
      } else {
        dispatch({ type: NEW_COMMENT_ERROR, data: r.data });
        throw r.data;
      }
    });
  };
};

export const getMetadataNames = ids => {
  return (dispatch, getState) => {
    return fetch(`/api/metadata/?ids=${ids.toString()}`).then(function(
      response
    ) {
      const r = response;
      if (r.status === 200) {
        return r.json().then(data => {
          dispatch({ type: LOADED_CUSTOM_METADATA, data: data });
        });
      } else {
        dispatch({ type: CUSTOM_METADATA_ERROR, data: r.data });
      }
    });
  };
};

export const reportPhoto = data => {
  return (dispatch, getState) => {
    let headers = {
      Authorization: "Token " + getState().auth.token,
      "Content-Type": "application/json"
    };

    let jsonthing = JSON.stringify(data);
    dispatch({ type: REPORTING_PHOTO, data: null });

    return fetch("/api/reports/", {
      method: "POST",
      headers: headers,
      body: jsonthing
    }).then(function(response) {
      const r = response;
      if (r.status === 201) {
        return r.json().then(data => {
          dispatch({ type: REPORTED_PHOTO, data: data });
        });
      } else {
        dispatch({ type: PHOTO_REPORT_FAILED, data: r.data });
        throw r.data;
      }
    });
  };
};

export const reportPhotoReset = () => {
  return (dispatch, getState) => {
    dispatch({ type: REPORTING_PHOTO, data: null });
  };
};