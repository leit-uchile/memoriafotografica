import {
  LANDING_LOADING,
  NEWS_RECOVERED,
  NEWS_EMPTY,
  CAROUSSEL_RECOVERED,
  CAROUSSEL_ERROR,
  REQUESTPHOTO,
  REMOVE_REQUESTPHOTO,
  SEND_REQUESTPHOTO,
} from "./types";
import { setAlert } from "./site_misc";

export const landingLoading = () => (dispatch) =>
  dispatch({ type: LANDING_LOADING, data: null });

export const getNews = () => (dispatch) => {
  return fetch("/api/news/").then((response) => {
    const r = response;
    if (r.status === 200) {
      return r
        .json()
        .then((data) => dispatch({ type: NEWS_RECOVERED, data: data }));
    } else {
      dispatch({ type: NEWS_EMPTY, data: r.data });
      throw r.data;
    }
  });
};

export const getCaroussel = () => (dispatch) => {
  return fetch("/api/caroussel").then((response) => {
    const r = response;
    if (r.status === 200) {
      return r
        .json()
        .then((data) =>
          dispatch({ type: CAROUSSEL_RECOVERED, data: data })
        );
    } else {
      dispatch({ type: CAROUSSEL_ERROR, data: r.data });
      throw r.data;
    }
  });
};

export const putRequestPhoto = (value) => {
  return (dispatch, getState) => {
    return dispatch({ type: REQUESTPHOTO, data: value });
  };
};

export const removeRequestPhoto = (value) => {
  return (dispatch, getState) => {
    return dispatch({ type: REMOVE_REQUESTPHOTO, data: value });
  };
};

export const sendRequest = (photos, info) => {
  return (dispatch, getState) => {
    let headers = { "Content-Type": "application/json" };

    let jsonthing = JSON.stringify({
      reason: info.reason,
      photos: photos,
      first_name: info.first_name,
      last_name: info.last_name,
      identity_document: info.identity_document,
      profession: info.profession,
      address: info.address,
      comuna: info.comuna,
      phone_number: info.phone_number,
      email: info.email,
      institution: info.institution,
    });

    return fetch(`/api/requests/photos/`, {
      method: "POST",
      headers: headers,
      body: jsonthing,
    }).then(function (response) {
      const r = response;
      if (r.status === 201) {
        return r.json().then((data) => {
          dispatch({ type: SEND_REQUESTPHOTO, data: data });
        });
      } else {
        dispatch(setAlert("Hubo un error al enviar su solicitud", "warning"));
      }
    });
  };
};
