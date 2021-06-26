import {
  AUTH_ERROR,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  REGISTRATION_FAILED,
  REGISTRATION_SUCCESS,
  AUTH_CLEAR_ERRORS,
  REGISTRATION_LINK_SUCCESS,
  REGISTRATION_LINK_FAILED,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  RESET_PASSWORD_VALIDATE_SUCCESS,
  RESET_PASSWORD_VALIDATE_FAILED,
  RESET_PASSWORD_CONFIRM_SUCCESS,
  RESET_PASSWORD_CONFIRM_FAILED,
  LOGOUT_SUCCESS,
  USER_LOADED,
  USER_RECOVERED_PHOTO,
  USER_RECOVERED_PHOTO_ERROR,
  USER_RECOVERED_ALBUM,
  USER_RECOVERED_ALBUM_ERROR,
  USER_RECOVERED_COMMENTS,
  USER_RECOVERED_COMMENTS_ERROR,
  NOTIFICATIONS_RECOVERED,
  USER_RECOVERED_NOTIFICATIONS,
  USER_RECOVERED_NOTIFICATIONS_ERROR,
  USER_NOTIFICATION_UPDATED,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAILED,
  USER_PASSWORD_UPDATED,
  USER_PASSWORD_UPDATE_FAILED,
  USER_PUBLIC_LOADING,
  USER_PUBLIC_LOADED,
  USER_PUBLIC_ERROR,
  RESEND_ACTIVATION_EMAIL,
  RESEND_ACTIVATION_EMAIL_FAILED,
} from "./types";
import { setAlert } from "./site_misc";

export const login = (email, password) => {
  return (dispatch) => {
    let headers = { "Content-Type": "application/json" };
    let body = JSON.stringify({ email, password });

    return fetch("/api/auth/login/", { headers, body, method: "POST" })
      .then((res) => {
        if (res.status < 500) {
          try{
            return res.json().then((data) => (
              { status: res.status, data }
            ));
          }catch{
            return { status: res.status, data: res.text };
          }
        } else {
          dispatch({ type: AUTH_ERROR, data: res.text });
        }
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch({ type: USER_LOADED, data: res.data.user });
          dispatch({ type: LOGIN_SUCCESS, data: res.data.token });
        } else if (res.status === 403 || res.status === 401) {
          dispatch({ type: AUTH_ERROR, data: res.data });
        } else {
          dispatch({ type: LOGIN_FAILED, data: res.data });
        }
      });
  };
};

export const register = (
  email,
  password,
  first_name,
  last_name,
  birth_date,
  rol_type,
  avatar,
  recaptchaToken
) => {
  return (dispatch) => {
    var formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("birth_date", birth_date);
    formData.append("rol_type", parseInt(rol_type));
    formData.append("avatar", avatar);
    formData.append("recaptchaToken", recaptchaToken);

    return fetch("/api/auth/register/", { body: formData, method: "POST" })
      .then((res) => {
        if (res.status < 500) {
          if (res.status === 200) {
            dispatch({ type: REGISTRATION_SUCCESS });
            return { status: res.status };
          } else {
            try{
              return res.json().then((data) => (
                { status: res.status, data }
              ));
            }catch{
              return { status: res.status, data: res.text };
            }
          }
        } else {
          console.log("Server Error!");
          dispatch({ type: REGISTRATION_FAILED, data: res.text });
        }
      })
      .then((res) => {
        if (res.status === 200) {
          return;
        } else if (res.status === 403 || res.status === 401) {
          dispatch({ type: AUTH_ERROR, data: res.data });
        } else {
          dispatch({ type: REGISTRATION_FAILED, data: res.data });
        }
      });
  };
};

export const cleanErrors = () => {
  return (dispatch) => {
    dispatch({ type: AUTH_CLEAR_ERRORS, data: null });
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch({ type: LOGOUT_SUCCESS, data: null });
  };
};

export const getRegisterLink = (code) => (dispatch) => {
  let headers = {
    "Content-Type": "application/json",
  };

  var daCode = code.slice(code.indexOf("=") + 1);

  return fetch(`/api/confirm/?code=${daCode}`, {
    method: "GET",
    headers: headers,
  }).then(function (response) {
    const r = response;
    if (r.status === 200) {
      return r.json().then((data) => {
        dispatch({ type: REGISTRATION_LINK_SUCCESS, data: data });
        dispatch({ type: USER_LOADED, data: data.user });
        dispatch({ type: LOGIN_SUCCESS, data: data.token });
      });
    } else {
      dispatch({ type: REGISTRATION_LINK_FAILED, data: r.data });
    }
  });
};

export const getUserPhotos = (user_id, page, page_size, extra = "") => (
  dispatch,
  getState
) => {
  let headers = {
    "Content-Type": "application/json",
    Authorization: "Token " + getState().user.token,
  };
  return fetch(
    `/api/users/photos/${user_id}/?page=${page}&page_size=${page_size}${extra}`,
    { method: "GET", headers: headers }
  ).then(function (response) {
    const r = response;
    if (r.status === 200) {
      return r.json().then((data) => {
        dispatch({ type: USER_RECOVERED_PHOTO, data: data });
      });
    } else {
      dispatch({ type: USER_RECOVERED_PHOTO_ERROR, data: r.data });

    }
  });
};

export const getUserAlbums = (user_id, page, page_size, extra = "") => (
  dispatch,
  getState
) => {
  let headers = {
    "Content-Type": "application/json",
    Authorization: "Token " + getState().user.token,
  };
  return fetch(
    `/api/users/albums/${user_id}/?page=${page}&page_size=${page_size}${extra}`,
    { method: "GET", headers: headers }
  ).then(function (response) {
    const r = response;
    if (r.status === 200) {
      return r.json().then((data) => {
        dispatch({ type: USER_RECOVERED_ALBUM, data: data });
      });
    } else {
      dispatch({ type: USER_RECOVERED_ALBUM_ERROR, data: r.data });

    }
  });
};

export const getUserComments = (user_id, page, page_size) => (
  dispatch,
  getState
) => {
  let headers = {
    "Content-Type": "application/json",
    Authorization: "Token " + getState().user.token,
  };
  return fetch(
    `/api/users/comments/${user_id}/?page=${page}&page_size=${page_size}`,
    { method: "GET", headers: headers }
  ).then(function (response) {
    const r = response;
    if (r.status === 200) {
      return r.json().then((data) => {
        dispatch({ type: USER_RECOVERED_COMMENTS, data: data });
      });
    } else {
      dispatch({ type: USER_RECOVERED_COMMENTS_ERROR, data: r.data });

    }
  });
};

//  getUserNotifications:
//  header: boolean that allows to distinguish between header and dashboard view

export const getUserNotifications = (user_id, page, page_size, header = false, extra = "") => (
  dispatch,
  getState
) => {
  let headers = {
    "Content-Type": "application/json",
    Authorization: "Token " + getState().user.token,
  };
  return fetch(
    `/api/users/notifications/${user_id}/?page=${page}&page_size=${page_size}${extra}`,
    { method: "GET", headers: headers }
  ).then(function (response) {
    const r = response;
    if (r.status === 200) {
      return r.json().then((data) => {
        header 
        ? dispatch({ type: NOTIFICATIONS_RECOVERED, data: data}) 
        : dispatch({ type: USER_RECOVERED_NOTIFICATIONS, data: data });
      });
    } else {
      dispatch({ type: USER_RECOVERED_NOTIFICATIONS_ERROR, data: r.data });
      throw r.data;
    }
  });
};

export const updateNotification = (id) => (
  dispatch,
  getState
) => {
  let headers = {
    "Content-Type": "application/json",
    Authorization: "Token " + getState().user.token,
  };
  return fetch(
    `/api/users/notifications/${id}/`,
    {
      method: "PUT",
      headers,
      body: JSON.stringify({
        read: true,
      })
    }
  ).then((response) => {
    const r = response;
    if (r.status === 200) {
      return r.json().then((data) => {
        dispatch({ type: USER_NOTIFICATION_UPDATED, data: data });
      });
    } else {
      dispatch(setAlert("Error actualizando notificación", "warning"));
      throw r.data;
    }
  });
};

/**
 * Load a user by ID if it is public
 */
export const loadAUser = (id) => (dispatch, getState) => {
  let headers = {};
  if (getState().user.isAuthenticated) {
    headers = {
      "Content-Type": "application/json",
      Authorization: "Token " + getState().user.token,
    };
  }
  dispatch({ type: USER_PUBLIC_LOADING });
  return fetch(`/api/users/${id}/`, { method: "GET", headers: headers })
    .then((res) => {
      const response = res;
      if (res.status < 400) {
        return response.json().then((data) => {
          return { status: res.status, data };
        });
      } else {
        dispatch({ type: USER_PUBLIC_ERROR, data: res.data });
        throw res;
      }
    })
    .then((res) => {
      if (res.status === 200) {
        dispatch({ type: USER_PUBLIC_LOADED, data: res.data });
        return res.data;
      } else {
        dispatch({ type: USER_PUBLIC_ERROR, data: res.data });
        throw res.data;
      }
    });
};

/**
 * Load all albums from a specific public user
 * @param {String|Number} user_id
 * @param {String} extra params for sorting and pagination, filtering, etc
 */
export const loadPublicUserAlbums = (user_id, extra = "") => (
  dispatch
) => {
  return fetch(`/api/albums/?user=${user_id}${extra}`
  ).then((response) => {
    const r = response;
    if (r.status === 200) {
      return r.json().then((data) => {
        dispatch({ type: USER_RECOVERED_ALBUM, data: data })
      });
    } else {
      dispatch(setAlert("Error cargando álbumes. Intente nuevamente", "warning"));
      dispatch({ type: USER_RECOVERED_ALBUM_ERROR });
    }
  });
}

/**
 * Load all photos from a specific public user
 * @param {String|Number} user_id
 * @param {String} extra params for sorting and pagination, filtering, etc
 */
export const loadPublicUserPhotos = (user_id, extra = "") => (
  dispatch
) => {
  return fetch(`/api/photos/?user=${user_id}${extra}`
  ).then((response) => {
    const r = response;
    if (r.status === 200) {
      return r.json().then((data) => {
        dispatch({ type: USER_RECOVERED_PHOTO, data: data });
      });
    } else {
      dispatch(setAlert("Error cargando fotografías. Intente nuevamente", "warning"));
      dispatch({ type: USER_RECOVERED_PHOTO_ERROR, data: r.data });

    }
  });
}

/**
 * Load current user
 */
export const loadUser = () => (dispatch, getState) => {
  const token = getState().user.token;

  let headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Token ${token}`;
  }
  return fetch("/api/auth/user/", { headers })
    .then((res) => {
      if (res.status < 500) {
        return res.json().then((data) => {
          return { status: res.status, data };
        });
      } else {
        console.log("Server Error!");
        throw res;
      }
    })
    .then((res) => {
      if (res.status === 200) {
        dispatch({ type: USER_LOADED, user: res.data });
        return res.data;
      } else if (res.status >= 400 && res.status < 500) {
        dispatch({ type: AUTH_ERROR, data: res.data });
        throw res.data;
      }
    });
};

/**
 * Update profile using JSON or FormData Multipart
 * @param {*} user
 * @param {bool} doJSON
 */
export const editProfile = (user, doJSON = true) => (dispatch, getState) => {
  let headers, body;

  if (doJSON) {
    headers = {
      "Content-Type": "application/json",
      Authorization: "Token " + getState().user.token,
    };
    body = JSON.stringify({ ...user });
  } else {
    // Assume multipart from backend
    headers = {
      Authorization: "Token " + getState().user.token,
    };
    body = new FormData();
    Object.keys(user).forEach((element) => {
      body.append(element, user[element]);
    });
  }

  return fetch(`/api/users/${user.id}/`, { headers, body, method: "PUT" })
    .then((res) => {
      if (res.status < 500) {
        return res.json().then((data) => {
          return { status: res.status, data };
        });
      } else {
        console.log("Server Error!");
        throw res;
      }
    })
    .then((res) => {
      if (res.status === 200) {
        dispatch({ type: USER_UPDATE_SUCCESS, data: res.data });
        dispatch(setAlert("Perfil actualizado", "success"));
      } else if (res.status === 403 || res.status === 401) {
        dispatch({ type: AUTH_ERROR, data: res.data });
        throw res.data;
      } else {
        dispatch({ type: USER_UPDATE_FAILED, data: res.data });
        throw res.data;
      }
    });
};

/**
 * Update users password using providing the old password
 * to the backend
 * @param {string} old_password
 * @param {string} new_password
 */
export const updatePassword = (old_password, new_password) => (
  dispatch,
  getState
) => {
  let headers = {
    "Content-Type": "application/json",
    Authorization: "Token " + getState().user.token,
  };

  let body = JSON.stringify({ old_password, new_password });

  return fetch("/api/auth/password/", { headers, body, method: "PUT" })
    .then((res) => {
      if (res.status < 500) {
        if (res.status !== 200) {
          return res.json().then((data) => {
            return { status: res.status, data };
          });
        } else {
          return { status: res.status, data: null };
        }
      } else {
        console.log("Server Error!");
        dispatch(setAlert("Error en el servidor", "warning"));
        throw res;
      }
    })
    .then((res) => {
      // Response is NO CONTENT
      if (res.status === 200) {
        dispatch({ type: USER_PASSWORD_UPDATED, data: res.data });
        dispatch(setAlert("Contraseña cambiada.", "success"));
        return res.data;
      } else if (res.status === 403 || res.status === 401) {
        dispatch({ type: AUTH_ERROR, data: res.data });
        dispatch(
          setAlert(
            "Sesion invalida, por favor ingrese nuevamente al sistema.",
            "warning"
          )
        );
        throw res.data;
      } else {
        dispatch({ type: USER_PASSWORD_UPDATE_FAILED, data: res.data });
        dispatch(setAlert(`Error: ${JSON.stringify(res.data)}`, "warning"));
        throw res.data;
      }
    });
};

export const uploadUserPicture = (avatar) => (dispatch, getState) => { };

export const resetPasswordRequest = (email) => (dispatch) => {
  let headers = { "Content-Type": "application/json" };
  let body = JSON.stringify({ email });

  return fetch("/api/auth/password_reset/", {
    headers,
    body,
    method: "POST",
  })
    .then((res) => {
      if (res.status < 500) {
        return res.json().then((data) => {
          return { status: res.status, data: data };
        });
      } else {
        console.log("Server Error!");
        throw res;
        // return { status: res.status, res.data };
      }
    })
    .then((res) => {
      if (res.status === 200) {
        dispatch({ type: RESET_PASSWORD_SUCCESS, data: null });
      } else {
        dispatch({ type: RESET_PASSWORD_FAILED, data: res.data });
        // throw res.data;
      }
    });
};

export const resetPasswordValidate = (token) => (dispatch) => {
  let headers = { "Content-Type": "application/json" };
  let body = JSON.stringify({ token });

  return fetch("/api/auth/password_reset/validate_token/", {
    headers,
    body,
    method: "POST",
  }).then((res) => {
    if (res.status === 200) {
      return res.json().then((data) => {
        dispatch({ type: RESET_PASSWORD_VALIDATE_SUCCESS, data: null });
        return { status: res.status, data: null };
      });
    } else {
      dispatch({ type: RESET_PASSWORD_VALIDATE_FAILED, data: res.data });
      // throw res.data;
    }
  });
};

export const resetPasswordConfirm = (token, password) => (dispatch) => {
  let headers = { "Content-Type": "application/json" };
  let body = JSON.stringify({ token, password });

  return fetch("/api/auth/password_reset/confirm/", {
    headers,
    body,
    method: "POST",
  })
    .then((res) => {
      if (res.status < 500) {
        return res.json().then((data) => {
          return { status: res.status, data };
        });
      } else {
        console.log("Server Error!");
        throw res;
      }
      // throw res.data;
    })
    .then((res) => {
      if (res.status === 200) {
        dispatch({ type: RESET_PASSWORD_CONFIRM_SUCCESS, data: null });
        return { status: res.status, data: null };
      } else {
        dispatch({ type: RESET_PASSWORD_CONFIRM_FAILED, data: res.data });
      }
    });
};

export const resendActivationEmail = (email) => (dispatch, getState) => {
  let headers, body;

    headers = {
      "Content-Type": "application/json",
    };
    body = JSON.stringify({ email:email });

  return fetch(`api/users/resend_activation/`, { headers, body, method: "POST" })
    .then((res) => {
      if (res.status < 500) {
        return dispatch({ type: RESEND_ACTIVATION_EMAIL });
      } else {
        console.log("Server Error!");
        throw res;
      }
    })
    .catch(()=>{
        dispatch({ type: RESEND_ACTIVATION_EMAIL_FAILED});
    });

};

