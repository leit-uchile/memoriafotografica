import { REQUESTPHOTO, REMOVE_REQUESTPHOTO, SEND_REQUEST } from "./types";

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

export const sendRequest = (id,info) => {
  return (dispatch, getState) => {
    let headers = {
      Authorization: "Token " + getState().auth.token,
      "Content-Type": "application/json"
    };

    let jsonthing = JSON.stringify({
      id: id, 
      reason: info.formData.reason,
      photos: info.requestedPhotos,
      first_name: info.formData.first_name,
      last_name: info.formData.last_name,
      identity_document: info.formData.identity_document,
      profession: info.formData.profession,
      address: info.formData.address,
      comuna: info.formData.comuna,
      phone_number: info.formData.phone_number,
      email: info.formData.email,
      institution: info.formData.institution
    });

    return fetch(`/api/requests/photos/${id}/`, {
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
        
      }
    });
  };
};