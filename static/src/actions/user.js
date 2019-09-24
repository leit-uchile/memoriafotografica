// TODO: Add real backend routes 

export const getUserPhotos = (auth, user_id, limit, offset) => {
  return (dispatch, getState) => {
    let headers = { 
        "Content-Type": "application/json",
        "Authorization": "Token " + auth,
    };
    return fetch(`/api/users/photos/${user_id}/?limit=${limit}&offset=${offset}`, { method: "GET", headers: headers }).then(
      function(response) {
        const r = response;
        if (r.status === 200) {
          return r.json().then(data => {
            dispatch({ type: "USER_RECOVERED_PHOTO", data: data.photos });
          });
        } else {
          dispatch({ type: "USER_RECOVERED_PHOTO_ERROR", data: r.data });
          throw r.data;
        }
      }
    );
  };
};

export const getUserAlbums = (auth, user_id, limit, offset) => {
  return (dispatch, getState) => {
    let headers = { 
        "Content-Type": "application/json",
        "Authorization": "Token " + auth,
    };
    return fetch(`/api/users/albums/${user_id}/?limit=${limit}&offset=${offset}`, { method: "GET", headers: headers }).then(      function(response) {
        const r = response;
        if (r.status === 200) {
          return r.json().then(data => {
            dispatch({ type: "USER_RECOVERED_ALBUM", data: data.albums });
          });
        } else {
          dispatch({ type: "USER_RECOVERED_ALBUM_ERROR", data: r.data });
          throw r.data;
        }
      }
    );
  };
};

export const getUserComments = (auth, user_id, limit, offset) => {
  return (dispatch, getState) => {
    let headers = { 
        "Content-Type": "application/json",
        "Authorization": "Token " + auth,
    };
    return fetch(`/api/users/comments/${user_id}/?limit=${limit}&offset=${offset}`, { method: "GET", headers: headers }).then(
      function(response) {
        const r = response;
        if (r.status === 200) {
          return r.json().then(data => {
            dispatch({ type: "USER_RECOVERED_COMMENTS", data: data.comments });
          });
        } else {
          dispatch({ type: "USER_RECOVERED_COMMENTS_ERROR", data: r.data });
          throw r.data;
        }
      }
    );
  };
};


export const editProfile = (auth, user) => {
  return (dispatch, getState) => {
    let headers = {
      "Content-Type": "application/json",
      "Authorization": "Token " + auth,
    };
    let body = JSON.stringify({user});

    return fetch(`api/users/${user.id}/`, {headers, body, method: "PUT"})
      .then(res => {
        if (res.status < 500) {
          return res.json().then(data => {
            return {status: res.status, data};
          })
        } else {
          console.log("Server Error!");
          throw res;
        }
      })
      .then(res => {
        if (res.status === 200) {
          dispatch({type: 'UPDATE_SUCCESSFUL', data: res.data });
          return res.data;
        } else if (res.status === 403 || res.status === 401) {
          dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
          throw res.data;
        } else {
          dispatch({type: "UPDATED_FAILED", data: res.data});
          throw res.data;
        }
      })
  }
}
