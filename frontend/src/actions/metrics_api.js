import { GET_GENERAL_STATS, GET_GENERAL_STATS_ERROR } from "./types";

export const getGeneralStats = () => (dispatch, getState) => {
  try {
    let headers = {
      "Content-Type": "application/json",
      Authorization: "Token " + getState().user.token,
    };
    return fetch("/api/metrics/general/", {
      method: "GET",
      headers: headers,
    }).then((response) => {
      const r = response;
      if (r.status === 200) {
        return r.json().then((data) => {
          dispatch({ type: GET_GENERAL_STATS, data: data });
        });
      } else {
        dispatch({ type: GET_GENERAL_STATS_ERROR, data: r.data });
        throw r.data;
      }
    });
  } catch (err) {
    dispatch({
      type: GET_GENERAL_STATS_ERROR,
      data: "Error on general stats action",
    });
    throw err;
  }
};
