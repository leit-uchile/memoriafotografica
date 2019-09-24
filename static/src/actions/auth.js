import {
  AUTH_ERROR,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  USER_LOADED,
  REGISTRATION_FAILED,
  REGISTRATION_SUCCESS,
  AUTH_CLEAR_ERRORS,
  LOGOUT_SUCCESS
} from './types';

export const login = (email, password) => {
  return (dispatch, getState) => {
    let headers = {"Content-Type": "application/json"};
    let body = JSON.stringify({email, password});

    return fetch("/api/auth/login/", {headers, body, method: "POST"})
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
          dispatch({type: LOGIN_SUCCESS, data: res.data });
          return res.data;
        } else if (res.status === 403 || res.status === 401) {
          dispatch({type: AUTH_ERROR, data: res.data});
          throw res.data;
        } else {
          dispatch({type: LOGIN_FAILED, data: res.data});
          throw res.data;
        }
      })
  }
}

export const loadUser = () => {
  return (dispatch, getState) => {
    dispatch({type: "USER_LOADING"});

    const token = getState().auth.token;

    let headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }
    return fetch("/api/auth/user/", {headers, })
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
          dispatch({type: USER_LOADED, user: res.data });
          return res.data;
        } else if (res.status >= 400 && res.status < 500) {
          dispatch({type: AUTH_ERROR, data: res.data});
          throw res.data;
        }
      })
  }
}

export const register = (email, password, first_name, last_name, birth_date, rol_type, avatar) => {
  return (dispatch, getState) => {

    var formData = new FormData();
    formData.append("email",email);
    formData.append("password",password);
    formData.append("first_name",first_name);
    formData.append("last_name", last_name);
    formData.append("birth_date", birth_date);
    formData.append("rol_type",parseInt(rol_type));
    formData.append("avatar", avatar)
        
    return fetch("/api/auth/register/", {body: formData, method: "POST"})
      .then(res => {
        if (res.status < 500) {
          return res.json().then(data => {
            return {status: res.status, data};
          })
        } else {
          console.log("Server Error!");
          dispatch({type: REGISTRATION_FAILED, data: res.data})
          throw res;
        }
      })
      .then(res => {
        if (res.status === 200) {
          dispatch({type: REGISTRATION_SUCCESS, data: res.data });
          return res.data;
        } else if (res.status === 403 || res.status === 401) {
          dispatch({type: AUTH_ERROR, data: res.data});
          throw res.data;
        } else {
          dispatch({type: REGISTRATION_FAILED, data: res.data});
          throw res.data;
        }
      })
  }
}

export const cleanErrors  = () => {
  return (dispatch, getState) => {
    dispatch({type: AUTH_CLEAR_ERRORS, data: null})
  }
}

export const logout = (token) => {
  let headers = {"Content-Type": "application/json"};
  return (dispatch, getState) => {
    dispatch({type: LOGOUT_SUCCESS, data: null})
  }
}