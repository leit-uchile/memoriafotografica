import {
  CREATED_METADATA,
  CREATED_METADATA_ERROR,
  CREATING_METADATA,
  RESET_METADATA_STORE,
  HOME_RECOVERED_TAGS,
  HOME_EMPTY_TAGS
} from "./types";

/**
 * Creates one metadata by name and associates it to the default
 * IPTC tag (Keywords)
 *
 * @param {string} name
 *
 * On success saves the metadata on store.metadata.newIDs
 * On failure saves reason and name on store.metadata.failedCreations
 */
export const createMetadataByName = name => (dispatch, getState) => {
  let headers = {
    "Content-Type": "application/json",
    Authorization: "Token " + getState().auth.token
  };

  // NOTE: metadata defaults to 1
  fetch("/api/metadata/", {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ value: name, metadata: 1 })
  }).then(function(response) {
    const r = response;
    if (r.status === 201) {
      r.json().then(data => dispatch({ type: CREATED_METADATA, data: data }));
    } else {
      r.json().then(data =>
        dispatch({ type: CREATED_METADATA_ERROR, data: { data, name: name } })
      );
    }
  });
};

/**
 * Creates multiple metadata from a list of names
 * doing multiple calls to the API
 * @param {Array} nameList
 */
export const createMultipleMetas = nameList => (dispatch, getState) => {
  // Failsafe
  if (nameList.length === 0) {
    return;
  }
  // Set process in motion
  dispatch({ type: CREATING_METADATA, data: nameList.length });

  const funcs = nameList.map(name => () =>
    createMetadataByName(name)(dispatch, getState)
  );

  const callWithTimeout = (id, list) => {
    if (id !== list.length) {
      list[id]();
      setTimeout(() => callWithTimeout(id + 1, list), 200);
    }
  };

  callWithTimeout(0, funcs);
};

/**
 * Create custom metadata with asociation
 * @param {String} name
 * @param {Number} iptcId
 */
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
  dispatch({ type: RESET_METADATA_STORE, data: null });

/**
 * Search metadata by name using a token if available
 * @param {String} query
 */
export const searchMetadataByValue = (query, limit=10) => (dispatch, getState) => {
  const success_func = response => {
    const r = response;
    if (r.status === 200) {
      r.json().then(data =>
        dispatch({ type: HOME_RECOVERED_TAGS, data: data })
      );
    } else {
      dispatch({ type: HOME_EMPTY_TAGS });
    }
  };

  if (getState().auth.isAuthenticated) {
    let headers = { Authorization: "Token " + getState().auth.token };
    fetch(`/api/metadata/?search=${query}&limit=${limit}`, { headers }).then(success_func);
  } else {
    fetch(`/api/metadata/?search=${query}&limit=${limit}`).then(success_func);
  }
};
