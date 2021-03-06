import {
  CREATING_TAGSUGGESTION,
  CREATED_TAGSUGGESTION,
  CREATED_TAGSUGGESTION_ERROR,
  LOADING_TAGSUGGESTION,
  RECOVERED_TAGSUGGESTION,
  RECOVERED_TAGSUGGESTION_ERROR,
  APPROVING_TAGSUGGESTION,
  APPROVED_TAGSUGGESTION,
  APPROVED_TAGSUGGESTION_ERROR,
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

export const approveTagSuggestions = (tagIds, approve=1) => (dispatch, getState) => {
  let headers = {
    "Content-Type": "application/json",
    Authorization: "Token " + getState().user.token,
  };

  dispatch({ type: APPROVING_TAGSUGGESTION });

  let request = tagIds.map((id, ) =>
    fetch(`/api/tagsuggestion/approve/${id}/`, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify({"approve": approve})
    }).then((r) => [r, id])
  );

  let approved = [];
  let failed = [];

  Promise.all(request).then((responses) => {
    for (let response of responses) {
      console.log(response[0])
      if (response[0].status === 202) {
        approved.push(response[1]);
      } else {
        failed.push(response[1]);
      }
    }
  });

  if (failed.length > 0) {
    dispatch({
      type: APPROVED_TAGSUGGESTION_ERROR,
      data: { failed, approved },
    });
  } else {
    dispatch({ type: APPROVED_TAGSUGGESTION, data: approved });
  }
};
