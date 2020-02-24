import {
  LANDING_LOADING,
  LANDING_RECOVERED_NEWS,
  LANDING_EMPTY_NEWS,
  LANDING_RECOVERED_CAROUSSEL,
  LANDING_CAROUSSEL_ERROR
} from "./types";

export const landingLoading = () => dispatch =>
  dispatch({ type: LANDING_LOADING, data: null });

export const getNews = () => dispatch => {
  return fetch("/api/news/").then(response => {
    const r = response;
    if (r.status === 200) {
      return r
        .json()
        .then(data => dispatch({ type: LANDING_RECOVERED_NEWS, data: data }));
    } else {
      dispatch({ type: LANDING_EMPTY_NEWS, data: r.data });
      throw r.data;
    }
  });
};

export const getCaroussel = () => dispatch => {
  return fetch("/api/caroussel").then(response => {
    const r = response;
    if (r.status === 200) {
      return r
        .json()
        .then(data =>
          dispatch({ type: LANDING_RECOVERED_CAROUSSEL, data: data })
        );
    } else {
      dispatch({ type: LANDING_CAROUSSEL_ERROR, data: r.data });
      throw r.data;
    }
  });
};
