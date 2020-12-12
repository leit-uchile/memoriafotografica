import { metadata } from "..";
import {
  CREATED_TAGSUGGESTION,
  CREATING_TAGSUGGESTION,
  CREATED_TAGSUGGESTION_ERROR
} from "./types";


export const createTagSuggestion = (photo, metadataList) => (dispatch, getState) => {
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

  data = metadata.map((meta) => ({metadata: meta, photo: photo}));

  // NOTE: metadata defaults to 1
  fetch("/api/tagsuggestion/", {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data),
  }).then(function (response) {
    const r = response;
    if (r.status === 201) {
      r.json().then((data) => dispatch({ type: CREATED_TAGSUGGESTION, data: data }));
    } else {
      r.json().then((data) =>
        dispatch({ type: CREATED_TAGSUGGESTION_ERROR, data: { data } })
      );
    }
  });
};
