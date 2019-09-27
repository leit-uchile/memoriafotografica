import {
  CREATED_METADATA,
  CREATED_METADATA_ERROR,
  CREATING_METADATA
} from "./types";

export const createMetadataByName = name => (dispatch, getState) => {
  let headers = {
    "Content-Type": "application/json",
    Authorization: "Token " + getState().auth.token
  };

  fetch("/api/metadata/", {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ value: name })
  }).then(function(response) {
    const r = response;
    if (r.status === 200) {
      r.json().then(data => dispatch({ type: CREATED_METADATA, data: data }));
    } else {
      r.json().then(data =>
        dispatch({ type: CREATED_METADATA_ERROR, data: { data, name: name } })
      );
    }
  });
};

export const createMultipleMetas = nameList => (dispatch, getState) => {
  
  const funcs = nameList.map(name => () =>
    createMetadataByName(name)(dispatch, getState)
  );

  const callWithTimeout = (id, list) => {
    if (id !== list.length) {
      list[id]();
      setTimeout(() => callWithTimeout(id + 1, list), 500);
    }
  };

  callWithTimeout(0, funcs);
};

export const createMetadata = (name, iptcId) => (dispatch, getState) => {
  let headers = {
    "Content-Type": "application/json",
    Authorization: "Token " + getState().auth.token
  };

  fetch("/api/metadata/", {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ value: name, metadata: iptcId })
  }).then(function(response) {
    const r = response;
    if (r.status === 200) {
      r.json().then(data => dispatch({ type: CREATED_METADATA, data: data }));
    } else {
      r.json().then(data =>
        dispatch({ type: CREATED_METADATA_ERROR, data: { data, name: name } })
      );
    }
  });
};

/**
 * Reset the array containing the ids from new created metadata
 */
export const resetNewMetadataIds = () => (dispatch, getState) =>
  dispatch({ type: CREATING_METADATA, data: null });
