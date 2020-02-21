import {
  UPLOADING,
  UPLOADED_PHOTO,
  ERROR_UPLOADING_PHOTO,
  READ_UPLOAD_DISCLOSURE,
  CREATE_ALBUM_SENT,
  CREATED_ALBUM,
  CREATED_ALBUM_ERROR
} from "./types";

import { setAlert } from "./alert";

/* When uploading each photo will reduce to success or error.
  In case of error the payload will contain the id for
  user feedback (and posibly relaunch)

  photos : {
    photoList: Array,
    cc: String
  }
*/
export const uploadImages = photos => {
  return (dispatch, getState) => {
    let header = {
      Authorization: "Token " + getState().auth.token
    };

    var currentTime = new Date();
    // Bug: January is 0
    currentTime = `${currentTime.getDate()}-${currentTime.getMonth()+1}-${currentTime.getFullYear()}`;

    dispatch({ type: UPLOADING, data: photos.length });

    const funcs = photos.photosList.map((photo, key) => () => {
      let formData = new FormData();
      // If no title available create one for our date
      formData.append(
        "title",
        photo.meta.title
          ? photo.meta.title
          : `Foto N-${key + 1} subida el ${currentTime}`
      );
      formData.append("description", photo.meta.description);
      formData.append("aspect_h", photo.meta.aspect_h);
      formData.append("aspect_w", photo.meta.aspect_w);
      formData.append("image", photo.photo);
      // Send our permissions
      formData.append(
        "permission",
        photo.meta.cc !== null ? photo.meta.cc : photos.cc ? photos.cc : "CC BY"
      );
      // Date photos were taken
      formData.append("upload_date", photos.date+"T00:00");

      // Add metadata in format 1,2,4 string
      if(photo.meta.tags.length !== 0){
        formData.append("metadata", photo.meta.tags)
      }

      const this_key = key; // avoid binding bellow

      fetch("/api/photos/", {
        method: "POST",
        headers: header,
        body: formData
      })
        .then(
          function(response) {
            const r = response;
            if (r.status === 201) {
              r.json().then(payload => {
                dispatch({
                  type: UPLOADED_PHOTO,
                  data: {
                    photo_index: this_key,
                    photo_id: payload.id
                  }
                });
              });
            } else {
              dispatch(setAlert("Error al subir fotografia", "warning"));

              dispatch({
                type: ERROR_UPLOADING_PHOTO,
                data: {
                  photo_index: this_key
                }
              });
            }
          }
        )
        .catch(error => {
          dispatch(setAlert("Error al subir fotografia", "warning"));
          dispatch({
            type: ERROR_UPLOADING_PHOTO,
            data: {
              photo_index: this_key,
              response: error
            }
          });
        });
    });

    const callWithTimeout = (id, list) => {
      if (id !== list.length) {
        list[id]();
        setTimeout(() => callWithTimeout(id + 1, list), 1000);
      }
    };

    callWithTimeout(0, funcs);
  };
};

export const readDisclosure = () => (dispatch, getState) =>
  dispatch({ type: READ_UPLOAD_DISCLOSURE, data: null });

export const createAlbum = formData => (dispatch, getState) => {
  dispatch({ type: CREATE_ALBUM_SENT, data: null });

  let header = {
    Authorization: "Token " + getState().auth.token,
    "Content-Type": "application/json"
  };

  fetch("/api/albums/", {
    method: "POST",
    headers: header,
    body: JSON.stringify(formData)
  })
    .then(res => {
      if (res.status === 201) {
        dispatch({
          type: CREATED_ALBUM,
          data: null
        });
      } else {
        dispatch(setAlert("Error al crear album", "warning"));
        res.json().then(payload => {
          dispatch({
            type: CREATED_ALBUM_ERROR,
            error: payload
          });
        });
      }
    })
    .catch(error => {
      dispatch(setAlert("Error al subir fotografia", "warning"));
      dispatch({
        type: CREATED_ALBUM_ERROR,
        error: error
      });
    });
};
