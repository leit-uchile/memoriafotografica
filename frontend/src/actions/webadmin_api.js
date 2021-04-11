import {
  NEWS_RECOVERED,
  NEWS_EMPTY,
  CAROUSSEL_RECOVERED,
  CAROUSSEL_ERROR,
  REQUESTPHOTO,
  REMOVE_REQUESTPHOTO,
  SEND_REQUESTPHOTO,
  CONTACT_SUCCESS,
  CONTACT_ERROR,
  PHOTOREQUESTS_RECOVERED,
  PHOTOREQUESTS_ERROR,
  PHOTOREQUEST_RECOVERED,
  PHOTOREQUEST_ERROR,
  PHOTOREQUEST_SWITCH_STATE,
  PHOTOREQUEST_SWITCH_STATE_ERROR,
  CONTACTMESSAGES_RECOVERED,
  CONTACTMESSAGES_ERROR,
  CONTACTMESSAGE_SWITCH_STATE,
  CONTACTMESSAGE_SWITCH_STATE_ERROR,
  VALIDATE_RECAPTCHA,
  VALIDATE_RECAPTCHA_ERROR,
  RESET_RECAPTCHA,
} from "./types";
import { setAlert } from "./site_misc";

export const validateRecaptcha = (valueRecaptcha) => (dispatch) => {
  {
    let header = { "Content-Type": "application/json" };
    let data = { recaptcha: valueRecaptcha };
    fetch("/api/users/recaptcha/", {
      method: "POST",
      body: JSON.stringify(data),
      headers: header,
    }).then(function (response) {
      if (response.status == 200) {
        return response
          .json()
          .then((data) => dispatch({ type: VALIDATE_RECAPTCHA, data: data }));
      } else {
        dispatch({ type: VALIDATE_RECAPTCHA_ERROR, data: response.data });
      }
    });
  }
};

export const resetValidateRecaptcha = () => (dispatch) => {
  dispatch({ type: RESET_RECAPTCHA, data: null });
};

export const getNews = (page = 0, page_size = 4, params = "") => (dispatch) => {
  return fetch(
    `/api/news/?page=${page + 1}&page_size=${page_size}${params}`
  ).then((response) => {
    const r = response;
    if (r.status === 200) {
      return r
        .json()
        .then((data) => dispatch({ type: NEWS_RECOVERED, data: data }));
    } else {
      dispatch({ type: NEWS_EMPTY, data: r.data });
    }
  });
};

export const getCaroussel = () => (dispatch) => {
  return fetch("/api/caroussel").then((response) => {
    const r = response;
    if (r.status === 200) {
      return r
        .json()
        .then((data) => dispatch({ type: CAROUSSEL_RECOVERED, data: data }));
    } else {
      dispatch({ type: CAROUSSEL_ERROR, data: r.data });
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
    let headers = {
      "Content-Type": "application/json",
      Authorization: "Token " + getState().user.token,
    };

    let jsonthing = JSON.stringify({
      reason: info.reason,
      photos: photos,
      first_name: info.first_name,
      last_name: info.last_name,
      identity_document: info.identity_document,
      profession: info.profession,
      address: info.address,
      district: info.district,
      phone_number: info.phone_number,
      email: info.email,
      institution: info.institution,
      recaptchaToken: info.recaptchaToken,
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
        if (r.status === 401) {
          dispatch(
            setAlert("Debe logearse para solicitar una foto", "warning")
          );
        } else {
          dispatch(setAlert("Hubo un error al enviar su solicitud", "warning"));
        }
      }
    });
  };
};

/**
 * Recover all Photo Request
 */
export const getRequests = (query, page, page_size, extra) => (
  dispatch,
  getState
) => {
  let headers = {
    "Content-Type": "application/json",
    Authorization: "Token " + getState().user.token,
  };
  return fetch(
    `/api/requests/photos/all/?search=${query}&page=${page}&page_size=${page_size}${extra}`,
    {
      method: "GET",
      headers: headers,
    }
  ).then(function (response) {
    const r = response;
    if (r.status === 200) {
      return r.json().then((data) => {
        dispatch({ type: PHOTOREQUESTS_RECOVERED, data: data });
      });
    } else {
      dispatch({ type: PHOTOREQUESTS_ERROR, data: r.data });
    }
  });
};

/**
 * Get Request Details
 * @param {*} id
 */
export const getRequest = (id) => (dispatch, getState) => {
  let headers = {
    Authorization: "Token " + getState().user.token,
  };
  fetch(`/api/requests/photos/${id}/`, {
    headers: headers,
  }).then(function (response) {
    const r = response;
    if (r.status === 200) {
      return r.json().then((data) => {
        dispatch({ type: PHOTOREQUEST_RECOVERED, data: data });
      });
    } else {
      dispatch({ type: PHOTOREQUEST_ERROR, data: r.data });
    }
  });
};

export const updateRequest = (request) => (dispatch, getState) => {
  let headers = {
    "Content-Type": "application/json",
    Authorization: "Token " + getState().user.token,
  };
  let jsonthing = JSON.stringify({
    attached: request.photosAndData,
    resolved: request.resolved,
    approved: request.approved,
  });

  return fetch(`/api/requests/photos/${request.id}/`, {
    method: "PUT",
    headers,
    body: jsonthing,
  }).then((response) => {
    const r = response;
    if (r.status === 200) {
      return r.json().then((data) => {
        dispatch({ type: PHOTOREQUEST_SWITCH_STATE, data: data });
      });
    } else {
      dispatch(setAlert("Hubo un error al actualizar la solicitud", "warning"));
      dispatch({ type: PHOTOREQUEST_SWITCH_STATE_ERROR, data: r.data });
    }
  });
};

export const contactUs = (formData) => {
  return (dispatch) => {
    let headers = { "Content-Type": "application/json" };
    let jsonthing = JSON.stringify({
      first_name: formData.name,
      last_name: formData.lastname,
      phone_number: formData.phone,
      email: formData.email,
      message: formData.message,
      recaptchaToken: formData.recaptchaToken,
    });
    if (formData.recaptchaToken) {
      return fetch(`/api/requests/contact/all/`, {
        method: "POST",
        headers: headers,
        body: jsonthing,
      }).then(function (response) {
        const r = response;
        if (r.status === 201) {
          return r.json().then((data) => {
            dispatch({ type: CONTACT_SUCCESS, data: data });
          });
        } else {
          dispatch(setAlert("Hubo un error al enviar su mensaje", "warning"));
          dispatch({ type: CONTACT_ERROR, data: r.data });
        }
      });
    } else {
      dispatch(setAlert("Debe rellenar el captcha", "warning"));
    }
  };
};

/**
 * Recover all Messages from Contact Us
 */
export const getMessages = (query, page, page_size, extra) => (
  dispatch,
  getState
) => {
  let headers = {
    "Content-Type": "application/json",
    Authorization: "Token " + getState().user.token,
  };
  return fetch(
    `/api/requests/contact/all/?search=${query}&page=${page}&page_size=${page_size}${extra}`,
    {
      method: "GET",
      headers: headers,
    }
  ).then((response) => {
    const r = response;
    if (r.status === 200) {
      return r.json().then((data) => {
        dispatch({ type: CONTACTMESSAGES_RECOVERED, data: data });
      });
    } else {
      dispatch({ type: CONTACTMESSAGES_ERROR, data: r.data });
    }
  });
};

export const updateMessage = (messageUpdate, formData) => (
  dispatch,
  getState
) => {
  let headers = {
    "Content-Type": "application/json",
    Authorization: "Token " + getState().user.token,
  };
  let jsonthing = JSON.stringify({
    reply: formData.reply,
    resolved: messageUpdate.resolved,
    email_sent: messageUpdate.email_sent,
    subject: formData.subject,
  });
  return fetch(`/api/requests/contact/${messageUpdate.id}/`, {
    method: "PUT",
    headers: headers,
    body: jsonthing,
  }).then((response) => {
    const r = response;
    if (r.status === 200) {
      return r.json().then((data) => {
        dispatch(setAlert("Solicitud actualizada exitosamente", "success"));
        dispatch({ type: CONTACTMESSAGE_SWITCH_STATE, data: data });
      });
    } else {
      dispatch(setAlert("Error actualizando solicitud. Intente nuevamente", "warning"));
      dispatch({ type: CONTACTMESSAGE_SWITCH_STATE_ERROR, data: r.data });
    }
  });
};
