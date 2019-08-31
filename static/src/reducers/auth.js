const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: (localStorage.getItem("isAuth") === "true"),
  isLoading: true,
  user: JSON.parse(localStorage.getItem("user")),
  errors: {},
};


export default function auth(state=initialState, action) {
  // TODO: Actually load the info in a different State!
  switch (action.type) {
    case 'USER_LOADED':
      return {...state, isAuthenticated: true, isLoading: false, user: action.user};

    case 'LOGIN_SUCCESSFUL':
      localStorage.setItem("token", action.data.token);
      localStorage.setItem("isAuth", true);
      localStorage.setItem("user", JSON.stringify(action.data.user));
      return {...state, ...action.data, isAuthenticated: true, isLoading: false, errors: null};

    case 'REGISTRATION_SUCCESSFUL':
      localStorage.setItem("token", action.data.token);
      localStorage.setItem("isAuth", true);
      localStorage.setItem("user", JSON.stringify(action.data.user));
      return {...state, ...action.data, isAuthenticated: true, isLoading: false, errors: null};

    case 'REGISTRATION_FAILED':
      return {...state, errors: {register: "REGISTRATION_FAILED"}};

    case 'AUTHENTICATION_ERROR':
      return {...state}
    case 'LOGIN_FAILED':
      return {...state, errors: action.data}
    case 'LOGOUT_SUCCESSFUL':
      localStorage.removeItem("token");
      localStorage.setItem("isAuth", false);
      localStorage.removeItem("user");
      return {...state, errors: action.data, token: null, user: null,
        isAuthenticated: false, isLoading: false};
    case 'CLEAR_AUTH_ERRORS':
      return {...state, errors: {}};
    default:
      return state;
  }
}
