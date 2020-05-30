import {
  CREATED_METADATA,
  CREATED_METADATA_ERROR,
  CREATING_METADATA,
  RESET_METADATA_STORE,
  RECOVERED_TAGS,
  EMPTY_TAGS,
  RECOVERED_IPTCS,
  EMPTY_IPTCS,
  CUSTOM_METADATA_ERROR,
  LOADED_CUSTOM_METADATA,
  RECOVERED_METADATA_BATCH,
  EMPTY_METADATA_BATCH,
  UPDATED_METADATA,
  UPDATED_METADATA_ERROR,
  RECOVERED_CURADOR_TAGS,
  EMPTY_CURADOR_TAGS,
  DELETED_METADATA,
  DELETED_METADATA_ERROR,
  METADATA_RESET_NB_OPS,
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
export const createMetadataByName = (name) => (dispatch, getState) => {
  let headers = {
    "Content-Type": "application/json",
    Authorization: "Token " + getState().user.token,
  };

  // NOTE: metadata defaults to 1
  fetch("/api/metadata/", {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ value: name, metadata: 1 }),
  }).then(function (response) {
    const r = response;
    if (r.status === 201) {
      r.json().then((data) => dispatch({ type: CREATED_METADATA, data: data }));
    } else {
      r.json().then((data) =>
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
export const createMultipleMetas = (nameList) => (dispatch, getState) => {
  // Failsafe
  if (nameList.length === 0) {
    return;
  }
  // Set process in motion
  dispatch({ type: CREATING_METADATA, data: nameList.length });

  const funcs = nameList.map((name) => () =>
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
    Authorization: "Token " + getState().user.token,
  };

  fetch("/api/metadata/", {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ value: name, metadata: iptcId }),
  }).then(function (response) {
    const r = response;
    if (r.status === 200) {
      r.json().then((data) => dispatch({ type: CREATED_METADATA, data: data }));
    } else {
      r.json().then((data) =>
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
 * Search metadata by name using a token if available for header searchbar
 * @param {String} query
 */
export const searchMetadataByValueSB = (query, limit = 10) => (
  dispatch,
  getState
) => {
  const success_func = (response) => {
    const r = response;
    if (r.status === 200) {
      r.json().then((data) => dispatch({ type: RECOVERED_TAGS, data: data }));
    } else {
      dispatch({ type: EMPTY_TAGS });
    }
  };

  if (getState().user.isAuthenticated) {
    let headers = { Authorization: "Token " + getState().user.token };
    fetch(`/api/metadata/?search=${query}&limit=${limit}`, { headers }).then(
      success_func
    );
  } else {
    fetch(`/api/metadata/?search=${query}&limit=${limit}`).then(success_func);
  }
};

/**
 * Recover all tags
 */
export const tags = () => (dispatch, getState) => {
  let headers = { "Content-Type": "application/json" };

  return fetch("/api/metadata/", { method: "GET", headers: headers }).then(
    function (response) {
      const r = response;
      if (r.status === 200) {
        return r.json().then((data) => {
          dispatch({ type: RECOVERED_TAGS, data: data });
        });
      } else {
        dispatch({ type: EMPTY_TAGS, data: r.data });
        throw r.data;
      }
    }
  );
};

/**
 * Recover all IPTC Tags
 */
export const iptcs = () => (dispatch, getState) => {
  let headers = { "Content-Type": "application/json" };

  return fetch("/api/iptc-keyword/", {
    method: "GET",
    headers: headers,
  }).then(function (response) {
    const r = response;
    if (r.status === 200) {
      return r.json().then((data) => {
        dispatch({ type: RECOVERED_IPTCS, data: data });
      });
    } else {
      dispatch({ type: EMPTY_IPTCS, data: r.data });
      throw r.data;
    }
  });
};

export const getMetadataNames = (ids) => (dispatch) => {
  return fetch(`/api/metadata/?ids=${ids.toString()}`).then(function (
    response
  ) {
    const r = response;
    if (r.status === 200) {
      return r.json().then((data) => {
        dispatch({ type: LOADED_CUSTOM_METADATA, data: data });
      });
    } else {
      dispatch({ type: CUSTOM_METADATA_ERROR, data: r.data });
    }
  });
};

/**
 * Get one page with unapproved metadata
 * @param {Number} size of batch
 */
export const getUnapprovedMetadataBatch = (size) => (dispatch, getState) => {
  let headers = {
    "Content-Type": "application/json",
    Authorization: "Token " + getState().user.token,
  };

  fetch(`/api/metadata/batch/?page=1&page_size=${size}`, {
    method: "GET",
    headers: headers,
  }).then(function (response) {
    const r = response;
    if (r.status === 200) {
      r.json().then((data) =>
        dispatch({ type: RECOVERED_METADATA_BATCH, data: data })
      );
    } else {
      dispatch({ type: EMPTY_METADATA_BATCH });
    }
  });
};

/**
 * Update metadata
 * @param {Object} metadata
 */
export const putMetadata = (metadata) => (dispatch, getState) => {
  let headers = {
    "Content-Type": "application/json",
    Authorization: "Token " + getState().user.token,
  };

  fetch(`/api/metadata/${metadata.id}/`, {
    method: "PUT",
    headers: headers,
    body: JSON.stringify(metadata),
  }).then(function (response) {
    const r = response;
    if (r.status === 206 || r.status === 200) {
      r.json().then((data) =>
        dispatch({ type: UPDATED_METADATA, data: metadata.id })
      );
    } else {
      dispatch({ type: UPDATED_METADATA_ERROR, data: metadata.id });
    }
  });
};

/**
 * Search metadata by name using a token if available for general purpose
 *
 * @param {String} query
 * @param {*} page
 * @param {*} page_size
 */
export const searchMetadataByValueGeneral = (query, page, page_size) => (
  dispatch,
  getState
) => {
  const success_func = (response) => {
    const r = response;
    if (r.status === 200) {
      r.json().then((data) =>
        dispatch({ type: RECOVERED_CURADOR_TAGS, data: data })
      );
    } else {
      dispatch({ type: EMPTY_CURADOR_TAGS });
    }
  };

  let headers = { Authorization: "Token " + getState().user.token };
  fetch(`/api/metadata/?search=${query}&page=${page}&page_size=${page_size}`, {
    headers,
  }).then(success_func);
};

/**
 * Delete metadata by id
 *
 * @param {*} id
 */
export const deleteMetadata = (id) => (dispatch, getState) => {
  let headers = { Authorization: "Token " + getState().user.token };
  fetch(`/api/metadata/${id}/`, { headers, method: "DELETE" }).then((response) => {
    const r = response;
    if (r.status === 204) {
      dispatch({ type: DELETED_METADATA, data: id });
    } else {
      dispatch({ type: DELETED_METADATA_ERROR, data: id });
    }
  });
};

/**
 * When doing multiple operations set number of ops
 * for completion checking and error catching
 */
export const setNBOps = (num) => (dispatch) =>
  dispatch({ type: METADATA_RESET_NB_OPS, data: num });
