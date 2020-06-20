import {
  LANDING_LOADING,
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
  CONTACTMESSAGE_SWITCH_STATE_ERROR
} from "./types";
import { setAlert } from "./site_misc";

export const landingLoading = () => (dispatch) =>
  dispatch({ type: LANDING_LOADING, data: null });

export const getNews = (page=0, page_size=4, params="") => (dispatch) => {
  return fetch(`/api/news/?page=${page+1}&page_size=${page_size}${params}`).then((response) => {
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
    let headers = { "Content-Type": "application/json",
    Authorization: "Token " + getState().user.token};

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

/**
 * Recover all Photo Request
 */
export const getRequests = () => (dispatch, getState) => {
  let headers = {
    "Content-Type": "application/json",
    Authorization: "Token " + getState().user.token
  };
  return fetch("/api/requests/photos/all/", {
    method: "GET",
    headers: headers
  }).then(function(response) {
    const r = response;
    if (r.status === 200) {
      return r.json().then(data => {
        dispatch({ type: PHOTOREQUESTS_RECOVERED, data: data });
      });
    } else {
      dispatch({ type: PHOTOREQUESTS_ERROR, data: r.data });
      throw r.data;
    }
  });
};

/**
 * Get Request Details
 * @param {*} id 
 */
export const getRequest = (id) => (dispatch, getState) => {
  let headers = {
    Authorization: "Token " + getState().user.token
  };
  fetch(`/api/requests/photos/${id}/`, {
    headers: headers
  }).then(function(response) {
    const r = response;
    if (r.status === 200) {
      return r.json().then(data => {
        dispatch({ type: PHOTOREQUEST_RECOVERED, data: data });
      });
    } else {
      dispatch({ type: PHOTOREQUEST_ERROR, data: r.data });
      throw r.data;
    }
  });
};

export const updateRequest = (request) => (dispatch, getState) => {
  let headers = {
    "Content-Type": "application/json",
    Authorization: "Token " + getState().user.token,
  };
  let jsonthing = JSON.stringify({
    attached: request.originalPhotos,
    resolved: request.resolved,
    email_sent: request.email_sent //Approved or Denied
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
      throw r.data;
    }
  });
};

export const contactUs = (formData) => {
  return (dispatch, getState) => {
    let headers = { "Content-Type": "application/json" };
    let jsonthing = JSON.stringify({
      first_name: formData.name,
      last_name: formData.lastname,
      phone_number: formData.phone,
      email: formData.email,
      message: formData.message,
    });
    return fetch(`/api/requests/contacts/all/`, {
      method: "POST",
      headers: headers,
      body: jsonthing,
    }).then(function (response) {
      const r = response;
      if (r.status === 201) {
        return r.json().then((data) => {
            dispatch({ type: CONTACT_SUCCESS, data: data })
        });
      } else {
        dispatch(setAlert("Hubo un error al enviar su mensaje", "warning"));
        dispatch({ type: CONTACT_ERROR, data: r.data });
        throw r.data;
      }
    });
  };
}

/**
 * Recover all Messages from Contact Us
 */
export const getMessages = () => (dispatch, getState) => {
  let headers = {
    "Content-Type": "application/json",
    Authorization: "Token " + getState().user.token
  };
  return fetch('/api/requests/contacts/all/', {
    method: "GET",
    headers: headers
  }).then(function(response) {
    const r = response;
    if (r.status === 200) {
      return r.json().then(data => {
        dispatch({ type: CONTACTMESSAGES_RECOVERED, data: data });
      });
    } else {
      dispatch({ type: CONTACTMESSAGES_ERROR, data: r.data });
      throw r.data;
    }
  });
};

export const updateMessage = (message, formData) => (dispatch, getState) => {
  let headers = {
    "Content-Type": "application/json",
    Authorization: "Token " + getState().user.token,
  };
  let jsonthing = JSON.stringify({
    newMsg: message,
    subject: formData.subject,
    response: formData.content
  });
  return fetch(`/api/requests/contacts/${message.id}/`, {
    method: "PUT",
    headers,
    body: jsonthing,
  }).then((response) => {
    const r = response;
    if (r.status === 200) {
      return r.json().then((data) => {
        dispatch({ type: CONTACTMESSAGE_SWITCH_STATE, data: data });
      });
    } else {
      dispatch(setAlert("Hubo un error al actualizar la solicitud", "warning"));
      dispatch({ type: CONTACTMESSAGE_SWITCH_STATE_ERROR, data: r.data });
      throw r.data;
    }
  });
};