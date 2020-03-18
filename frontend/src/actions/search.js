import { PUT_META, REMOVE_META } from "./types";

export const putSearchItem = (metaID, value) => {
  return (dispatch, getState) => {
    return dispatch({ type: PUT_META, data: { metaID, value } });
  };
};

export const removeSearchItem = (metaID, value) => {
  return (dispatch, getState) => {
    return dispatch({ type: REMOVE_META, data: { metaID, value } });
  };
};
