import {
  LOGIN_SUCCESS,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILED,
  REGISTRATION_LINK_SUCCESS,
  REGISTRATION_LINK_FAILED,
  AUTH_ERROR,
  LOGIN_FAILED,
  LOGOUT_SUCCESS,
  AUTH_CLEAR_ERRORS,
  USER_PHOTOS_ERROR,
  USER_PHOTOS_LOADING,
  USER_PHOTOS_LOADED,
  USER_RECOVERED_ALBUM,
  USER_RECOVERED_COMMENTS,
  USER_RECOVERED_NOTIFICATIONS,
  USER_RECOVERED_ALBUM_ERROR,
  USER_RECOVERED_COMMENTS_ERROR,
  USER_RECOVERED_NOTIFICATIONS_ERROR,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAILED,
  USER_NOTIFICATION_UPDATED,
  USER_LOADED,
  USER_PASSWORD_UPDATED,
  USER_PASSWORD_UPDATE_FAILED,
  USER_PUBLIC_LOADING,
  USER_PUBLIC_LOADED,
  USER_PUBLIC_ERROR,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  RESET_PASSWORD_VALIDATE_SUCCESS,
  RESET_PASSWORD_VALIDATE_FAILED,
  RESET_PASSWORD_CONFIRM_SUCCESS,
  RESET_PASSWORD_CONFIRM_FAILED,
  RESEND_ACTIVATION_EMAIL,
  RESEND_ACTIVATION_EMAIL_FAILED,
  RESET_UNREGISTERED_UPLOAD
} from "../actions/types";

/**
 * User will be loaded by the auth actions and dispatched here!
 * User deletion is done as a logout is successful
 */
const baseState = {
  photos: {
    results: [],
    count: 0,
  },
  comments: {
    results: [],
    count: 0,
  },
  albums: {
    results: [],
    count: 0,
  },
  notifications: {
    results: [],
    count: 0,
  },
  notificationUpdate: {},
  userData: null,
  dataStatus: 'idle',
  // auth
  token: null,
  isAuthenticated: false,
  isLoading: true,
  errors: {},
  // account activation
  activated: false,
  registerSuccess: false,

  // reset password
  resetPasswordRequest: false,
  resetPasswordTokenValid: false,
  resetPasswordConfirmed: false,

  resendActivation:'',
};

// Compare if the token is valid (12 hours)
const initialState =
  localStorage.getItem("isAuth") === null
    ? baseState
    : new Date().getTime() -
      JSON.parse(localStorage.getItem("isAuth")).timeSet >
      43200000
      ? baseState
      : {
        photos: {},
        comments: {},
        albums: {},
        notifications: {},
        notificationUpdate: {},
        userData: JSON.parse(localStorage.getItem("user")),
        dataStatus: 'idle',
        token: localStorage.getItem("token"),
        isAuthenticated: true,
        isLoading: true,
        errors: {},
        activated: false,
        registerSuccess: false,
      };

var logginDate;
export default function user(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      logginDate = new Date();
      localStorage.setItem("token", action.data);
      localStorage.setItem(
        "isAuth",
        JSON.stringify({ loggedIn: true, timeSet: logginDate.getTime() })
      );
      return {
        ...state,
        token: action.data,
        isAuthenticated: true,
        isLoading: false,
        errors: null,
      };

    case REGISTRATION_SUCCESS:
      return {
        ...state,
        registerSuccess: true,
        isLoading: false,
        errors: null,
      };

    case REGISTRATION_FAILED:
      return {
        ...state,
        registerSuccess: false,
        errors: { register: "REGISTRATION_FAILED" },
      };

    case REGISTRATION_LINK_SUCCESS:
      return {
        ...state,
        activated: true,
      };
    case REGISTRATION_LINK_FAILED:
      return { ...state, activated: false };

    case AUTH_ERROR:
      return { ...state };
    case LOGIN_FAILED:
      return { ...state, errors: action.data };
    case LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      localStorage.removeItem("isAuth");
      localStorage.removeItem("user");
      return {
        ...state,
        errors: action.data,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case AUTH_CLEAR_ERRORS:
      return { ...state, errors: {} };

    case USER_LOADED:
      localStorage.setItem("user", JSON.stringify(action.data));
      return {
        ...state,
        userData: { ...action.data }, // user
      };
    case USER_PHOTOS_LOADING:
      return {...state }
    case USER_PHOTOS_LOADED:
      return {
        ...state,
        photos: action.data,
      };
    case USER_PHOTOS_ERROR:
      return {
        ...state,
        photos: {},
        error: action.data,
      };
    case USER_RECOVERED_ALBUM:
      return {
        ...state,
        albums: action.data,
      };
    case USER_RECOVERED_COMMENTS:
      return {
        ...state,
        comments: action.data,
      };
    case USER_RECOVERED_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.data,
      };
    case USER_RECOVERED_ALBUM_ERROR:
      return {
        ...state,
        albums: [],
        error: action.data,
      };
    case USER_RECOVERED_COMMENTS_ERROR:
      return {
        ...state,
        comments: {},
        error: action.data,
      };
    case USER_RECOVERED_NOTIFICATIONS_ERROR:
      return {
        ...state,
        notifications: {},
        error: action.data,
      };
    case USER_UPDATE_SUCCESS:
      localStorage.setItem("user", JSON.stringify(action.data));
      return {
        ...state,
        userData: { ...action.data },
      };
    case USER_UPDATE_FAILED:
      return { ...state, errors: action.data };
    case USER_NOTIFICATION_UPDATED:
      return {
        ...state,
        notificationUpdate: action.data,
      };
    case USER_PASSWORD_UPDATED:
      return { ...state };
    case USER_PASSWORD_UPDATE_FAILED:
      return { ...state };
    case USER_PUBLIC_LOADING:
      return { 
        ...state,
        dataStatus: 'loading',
      };
    case USER_PUBLIC_LOADED:
      return { 
        ...state, 
        dataStatus: 'success',
        publicUser: action.data 
      };
    case USER_PUBLIC_ERROR:
      return { 
        ...state, 
        dataStatus: 'failure',
        publicUser: null 
    };
    case RESET_PASSWORD_SUCCESS:
      return { ...state, resetPasswordRequest: true };
    case RESET_PASSWORD_FAILED:
      return { ...state, resetPasswordRequest: false, errors: action.data };
    case RESET_PASSWORD_VALIDATE_SUCCESS:
      return { ...state, resetPasswordTokenValid: true };
    case RESET_PASSWORD_VALIDATE_FAILED:
      return { ...state, resetPasswordTokenValid: false, errors: action.data };
    case RESET_PASSWORD_CONFIRM_SUCCESS:
      return { ...state, resetPasswordConfirmed: true, errors: {} };
    case RESET_PASSWORD_CONFIRM_FAILED:
      return { ...state, errors: action.data, resetPasswordConfirmed: false};
    case RESEND_ACTIVATION_EMAIL:
      return {...state,resendActivation:'success'}
    case RESEND_ACTIVATION_EMAIL_FAILED:
      return {...state,resendActivation:'error'}
    case RESET_UNREGISTERED_UPLOAD:
      return { ...state , resendActivation:''}
    default:
      return { ...state };
  }
}

export const selectErrors = (state) => {
  let errors = [];
  if (state.user.errors) {
    errors = Object.keys(state.user.errors).map((field) => {
      return { field, message: state.user.errors[field] };
    });
  }
  return errors;
};

export const selectUserIsAuthenticated = (state) => state.user.isAuthenticated;

export const selectUserToken = (state) => state.user.token;

export const selectUserData = (state) => state.user.userData;

export const selectUserActivate = (state) => state.user.activated;

export const selectUserRegisterSucces = (state) => state.user.registerSuccess;

export const selectUserPhotos = (state) => state.user.photos;

export const selectUserComments = (state) => state.user.comments;

export const selectUserNotifications = (state) => state.user.notifications;

export const selectUserNotificationUpdate = (state) => state.user.notificationUpdate;

export const selectUserAlbums = (state) => state.user.albums;

export const selectUserPublicUser = (state) => state.user.publicUser;

export const selectUserPublicStatus = (state) => state.user.dataStatus;

