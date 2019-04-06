const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: true,
  user: null,
  errors: {},
};

export default function auth(state=initialState, action) {

  switch (action.type) {
    case 'USER_LOADING':
      return {...state, isLoading: true};

    case 'USER_LOADED':
      return {...state, isAuthenticated: true, isLoading: false, user: action.user};

    case 'LOGIN_SUCCESSFUL':
      localStorage.setItem("token", action.data.token);
      return {...state, ...action.data, isAuthenticated: true, isLoading: false, errors: null};

    case 'REGISTRATION_SUCCESSFUL':
      localStorage.setItem("token", action.data.token);
      return {...state, ...action.data, isAuthenticated: true, isLoading: false, errors: null};

    case 'REGISTRATION_FAILED':
      return {...state, errors: {register: "REGISTRATION_FAILED"}};

    case 'AUTHENTICATION_ERROR':
      break;
    case 'LOGIN_FAILED':
      break;
    case 'LOGOUT_SUCCESSFUL':
      localStorage.removeItem("token");
      return {...state, errors: action.data, token: null, user: null,
        isAuthenticated: false, isLoading: false};
    case 'CLEAR_AUTH_ERRORS':
      return {...state, errors: {}};
    default:
      return state;
  }
}