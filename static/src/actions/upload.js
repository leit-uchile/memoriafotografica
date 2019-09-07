/* When uploading each photo will reduce to success or error.
  In case of error the payload will contain the id for
  user feedback (and posibly relaunch)

  photos : {
    photoList: Array,
    cc: String
  }
*/
export const uploadImages = (photos, auth) => {
  return (dispatch, getState) => {
    let header = {
      Authorization: "Token " + auth
    };

    var currentTime = new Date();
    currentTime = `${currentTime.getDay()}-${currentTime.getMonth()}-${currentTime.getFullYear()}`;

    dispatch({ type: "UPLOADING", data: photos.length});

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
      formData.append("image", photo.photo);
      // Send our permissions
      formData.append(
        "permission",
        photo.meta.cc !== null ? photo.meta.cc : photos.cc ? photos.cc : "CC BY"
      );

      fetch("/api/photos/", {
        method: "POST",
        headers: header,
        body: formData
      }).then(function(response) {
        const r = response;
        if (r.status === 201) {
          dispatch({
            type: "UPLOADED_PHOTO",
            data: {
              photo_id: key,
            }
          });
        } else {
          dispatch({
            type: "ERROR_UPLOADING",
            data: {
              photo_id: key,
              response: r.data
            }
          });
          throw r.data;
        }
      }.bind(key));
    });

    const callWithTimeout = (id,list) => {
      if(id !== list.length){
        list[id]();
        setTimeout(() => callWithTimeout(id + 1, list), 1000)
      }
    }

    callWithTimeout(0,funcs);
  };
};

export const readDisclosure = () => {
  return (dispatch, getState) => {
    return dispatch({ type: "READ_DISCLOSURE", data: null });
  };
};
