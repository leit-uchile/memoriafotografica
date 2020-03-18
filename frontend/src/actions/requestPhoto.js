import { REQUESTPHOTO, REMOVE_REQUESTPHOTO, SEND_REQUEST } from "./types";
import { setAlert } from "./alert";

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

export const sendRequest = (photos,info) => {
  return (dispatch, getState) => {
    let headers = {"Content-Type" : "application/json"};

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
      institution: info.institution
    });

    return fetch(`/api/requests/photos/`, {
      method: "POST",
      headers: headers,
      body: jsonthing
    }).then(function(response) {
      const r = response;
      if (r.status === 201) {
        return r.json().then(data => {
          dispatch({ type: SEND_REQUEST, data: data });
        });
      } else {
        dispatch(setAlert("Hubo un error al enviar su solicitud", "warning"));
      }
    });
  };
};