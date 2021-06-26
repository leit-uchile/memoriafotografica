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
  METADATA_MERGE,
  METADATA_MERGE_ERROR,
} from "./types";
import { setAlert } from "./site_misc";

/**
 * Creates one metadata by name and associates it to the default
 * IPTC tag (Keywords)
 *
 * @param {string} name
 * @param {boolean} list if multiple names are sent
 *
 * On success saves the metadata on store.metadata.newIDs
 * On failure saves reason and name on store.metadata.failedCreations
 */
export const createMetadataByName =
  (name, list = false, token) =>
  (dispatch, getState) => {
    let headers =
      token === null
        ? {
            Authorization: "Token " + getState().user.token,
            "Content-Type": "application/json",
          }
        : {
            Authorization: "Token " + token,
            "Content-Type": "application/json",
          };

    let newMetadata = list
      ? name.map((el) => ({ value: el, metadata: 1 }))
      : [{ value: name, metadata: 1 }];

    // NOTE: metadata defaults to 1
    fetch("/api/metadata/", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(newMetadata),
    }).then(function (response) {
      const r = response;
      if (r.status === 201) {
        r.json().then((data) =>
          dispatch({ type: CREATED_METADATA, data: data })
        );
      } else {
        r.json().then((data) =>
          dispatch({ type: CREATED_METADATA_ERROR, data: { data, name: name } })
        );
      }
    });
  };

/**
 * Creates multiple metadata from a list of names
 * @param {Array} nameList
 */
export const createMultipleMetas =
  (nameList, token = null) =>
  (dispatch, getState) => {
    // Failsafe
    if (nameList.length === 0) {
      return;
    }
    // Set process in motion
    dispatch({ type: CREATING_METADATA, data: nameList.length });

    createMetadataByName(nameList, true, token)(dispatch, getState);
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
export const resetNewMetadataIds = () => (dispatch) =>
  dispatch({ type: RESET_METADATA_STORE, data: null });

/**
 * Search metadata by name using a token if available for header searchbar
 * @param {String} query
 * @param {*} limit
 * @param {*} iptc id
 */
export const searchMetadataByValueSB =
  (query, limit = 10, iptc = 0) =>
  (dispatch, getState) => {
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
      fetch(`/api/metadata/?search=${query}&limit=${limit}&iptc=${iptc}`, {
        headers,
      }).then(success_func);
    } else {
      fetch(`/api/metadata/?search=${query}&limit=${limit}&iptc=${iptc}`).then(
        success_func
      );
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
  }).then((response) => {
    const r = response;
    if (r.status === 206 || r.status === 200) {
      return r.json().then((data) => {
        dispatch(setAlert("Metadata actualizada exitosamente", "success"));
        dispatch({ type: UPDATED_METADATA, data: metadata });
      });
    } else {
      dispatch(
        setAlert("Error actualizando metadata. Intente nuevamente", "warning")
      );
      dispatch({ type: UPDATED_METADATA_ERROR, data: metadata });
    }
  });
};

/**
 * Search metadata by name using a token if available for general purpose
 *
 * @param {String} query
 * @param {*} page
 * @param {*} page_size
 * @param {String} extra parameters
 */
export const searchMetadataByValueGeneral =
  (query, page, page_size, extra) => (dispatch, getState) => {
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

    let user = getState().user;
    if (user.isAuthenticated) {
      let headers = { Authorization: "Token " + user.token };
      return fetch(
        `/api/metadata/?search=${query}&page=${page}&page_size=${page_size}${extra}`,
        {
          headers,
        }
      ).then(success_func);
    } else {
      return fetch(
        `/api/metadata/?search=${query}&page=${page}&page_size=${page_size}${extra}`
      ).then(success_func);
    }
  };

/**
 * Delete metadata by id
 *
 * @param {*} id
 */
export const deleteMetadata = (id) => (dispatch, getState) => {
  let headers = { Authorization: "Token " + getState().user.token };
  return fetch(`/api/metadata/${id}/`, {
    method: "DELETE",
    headers: headers,
  }).then((response) => {
    const r = response;
    if (r.status === 204) {
      dispatch(setAlert("Metadata eliminada exitosamente", "success"));
      dispatch({ type: DELETED_METADATA, data: id });
    } else {
      dispatch(
        setAlert("Error eliminando metadata. Intente nuevamente", "warning")
      );
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

/**
 * mergeMetadata by setting all references to the first
 * metadata using the ids
 *
 * @param {Array} ids of ints
 */
export const mergeMetadata = (ids) => (dispatch, getState) => {
  let headers = {
    "Content-Type": "application/json",
    Authorization: "Token " + getState().user.token,
  };
  return fetch("/api/metadata/merge/", {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ ids: ids }),
  }).then((response) => {
    const r = response;
    if (r.status === 200) {
      return r.json().then((data) => {
        dispatch(setAlert("Metadata unida exitosamente", "success"));
        dispatch({ type: METADATA_MERGE, data: data });
      });
    } else {
      dispatch(
        setAlert("Error uniendo metadata. Intente nuevamente", "warning")
      );
      dispatch({ type: METADATA_MERGE_ERROR, data: ids.join(",") });
    }
  });
};
