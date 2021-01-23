import {
  CREATED_TAGSUGGESTION,
  CREATING_TAGSUGGESTION,
  CREATED_TAGSUGGESTION_ERROR,
  LOADING_TAGSUGGESTION,
  RECOVERED_TAGSUGGESTION,
  RECOVERED_TAGSUGGESTION_ERROR,
  EMPTY_TAGSUGGESTION,
} from "../types";

export const createTagSuggestions = (photo, metadataList) => (
  dispatch,
  getState
) => {
  // Failsafe
  if (metadataList.length === 0) {
    return;
  }

  // Set process in motion
  dispatch({ type: CREATING_TAGSUGGESTION, data: metadataList.length });

  let headers = {
    "Content-Type": "application/json",
    Authorization: "Token " + getState().user.token,
  };

  let data = metadataList.map((meta) => ({ metadata: meta, photo: photo }));

  // NOTE: metadata defaults to 1
  fetch("/api/tagsuggestion/", {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data),
  }).then(function (response) {
    const r = response;
    if (r.status === 201) {
      r.json().then((data) =>
        dispatch({ type: CREATED_TAGSUGGESTION, data: data })
      );
    } else {
      r.json().then((data) =>
        dispatch({ type: CREATED_TAGSUGGESTION_ERROR, data: { data } })
      );
    }
  });
};

export const getTagSuggestions = () => (dispatch, getState) => {
  let headers = {
    "Content-Type": "application/json",
    Authorization: "Token " + getState().user.token,
  };

  dispatch({ type: LOADING_TAGSUGGESTION });

  fetch("/api/tagsuggestion/", {
    method: "GET",
    headers: headers,
  }).then(function (response) {
    const r = response;
    if (r.status === 200) {
      r.json().then((data) => {
        if (data.count > 0) {
          dispatch({ type: RECOVERED_TAGSUGGESTION, data: data });
        } else {
          dispatch({ type: EMPTY_TAGSUGGESTION });
        }
      });
    } else {
      r.json().then((data) =>
        dispatch({ type: RECOVERED_TAGSUGGESTION_ERROR, data: { data } })
      );
    }
  });
};
