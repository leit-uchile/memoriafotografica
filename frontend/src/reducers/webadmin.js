import {
  LANDING_LOADING,
  NEWS_RECOVERED,
  NEWS_EMPTY,
  CAROUSSEL_RECOVERED,
  CAROUSSEL_ERROR,
  REQUESTPHOTO,
  REMOVE_REQUESTPHOTO,
  SEND_REQUESTPHOTO,
  CONTACT_SUCCESS,
  CONTACT_ERROR,
  PHOTOREQUESTS_RECOVERED,
  PHOTOREQUESTS_ERROR,
  PHOTOREQUEST_SWITCH_STATE,
  PHOTOREQUEST_SWITCH_STATE_ERROR,
  CONTACTMESSAGES_RECOVERED,
  CONTACTMESSAGES_ERROR,
  CONTACTMESSAGE_SWITCH_STATE,
  CONTACTMESSAGE_SWITCH_STATE_ERROR,
  PHOTOREQUEST_RECOVERED,
  PHOTOREQUEST_ERROR,
  VALIDATE_RECAPTCHA,
  VALIDATE_RECAPTCHA_ERROR,
} from "../actions/types";

const initialState = {
  news: { count: 0, results: [] },
  caroussel: [],
  errors: [],
  requestedPhotos: [],
  requested: false,
  contacted: false,
  //Used in curador
  loading: false,
  messages: [],
  updatedMessage: false,
  requests: [],
  requestDetail: {},
  updatedRequest: false,
  recaptchaState: false,
};

export default function webadmin(state = initialState, action) {
  const { type, data } = action;
  switch (type) {
    //TODO -Joaquin Testing redux actions for the recaptcha
    case VALIDATE_RECAPTCHA:
      return { ...state, recaptchaState: true };
    case VALIDATE_RECAPTCHA_ERROR:
      return { ...state, recaptchaState: false };
    case LANDING_LOADING:
      return { ...state, loading: true };
    case NEWS_RECOVERED:
      return { ...state, loading: false, news: data };
    case NEWS_EMPTY:
      return {
        ...state,
        loading: false,
        news: { count: 0, results: [] },
        errors: data,
      };
    case CAROUSSEL_RECOVERED:
      return { ...state, loading: false, caroussel: data[0].news };
    case CAROUSSEL_ERROR:
      return { ...state, loading: false, caroussel: [], errors: data };
    case REQUESTPHOTO:
      let filtered = state.requestedPhotos.filter(
        (el) => el.id !== action.data.id
      );
      return {
        ...state,
        requestedPhotos: [...filtered, action.data],
        requested: false,
      };
    case REMOVE_REQUESTPHOTO:
      let filtered2 = state.requestedPhotos.filter(
        (el) => el.id !== action.data.id
      );
      return { ...state, requestedPhotos: [...filtered2] };
    case SEND_REQUESTPHOTO:
      return { ...state, requestedPhotos: [], requested: true };
    case PHOTOREQUESTS_RECOVERED:
      return { ...state, requests: action.data };
    case PHOTOREQUESTS_ERROR:
      return { ...state, errors: data };
    case PHOTOREQUEST_RECOVERED:
      return { ...state, requestDetail: action.data };
    case PHOTOREQUEST_ERROR:
      return { ...state, requestDetail: {}, error: action.data };
    case PHOTOREQUEST_SWITCH_STATE:
      return { ...state, updatedRequest: true };
    case PHOTOREQUEST_SWITCH_STATE_ERROR:
      return { ...state, updatedRequest: false };
    case CONTACT_SUCCESS:
      return { ...state, contacted: true };
    case CONTACT_ERROR:
      return { ...state, contacted: false };
    case CONTACTMESSAGES_RECOVERED:
      return { ...state, messages: action.data };
    case CONTACTMESSAGES_ERROR:
      return { ...state, errors: data };
    case CONTACTMESSAGE_SWITCH_STATE:
      return { ...state, updatedMessage: true };
    case CONTACTMESSAGE_SWITCH_STATE_ERROR:
      return { ...state, updatedMessage: false };
    default:
      return state;
  }
}
