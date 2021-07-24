import {
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
  GUEST_VERIFY,
  GUEST_VERIFY_ERROR,
  COMPLETE_REGISTRATION,
  COMPLETE_REGISTRATION_ERROR,
  RESET_UNREGISTERED_UPLOAD
} from "../actions/types";

const initialState = {
  news: { results: [], count: 0, },
  caroussel: [],
  errors: [],
  requestedPhotos: [],
  requested: false,
  contacted: false,
  //Used in curador
  messages: { results: [], count: 0, },
  messageUpdate: {},
  requests: { results: [], count: 0, },
  requestDetail: {},
  requestUpdate: {},
  guestState: false,
};

export default function webadmin(state = initialState, action) {
  const { type, data } = action;
  switch (type) {
    case COMPLETE_REGISTRATION:
      return { ...state, completeRegistration: action.data };
    case COMPLETE_REGISTRATION_ERROR:
      return { ...state, completeRegistration: action.data };
    case GUEST_VERIFY:
      return { ...state, guestState: data };
    case GUEST_VERIFY_ERROR:
      return { ...state, guestState: false };
    case NEWS_RECOVERED:
      return { ...state, news: data };
    case NEWS_EMPTY:
      return {
        ...state,
        news: { count: 0, results: [] },
        errors: data,
      };
    case CAROUSSEL_RECOVERED:
      return { ...state, caroussel: data[0].news };
    case CAROUSSEL_ERROR:
      return { ...state, caroussel: [], errors: data };
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
      return { ...state, requestUpdate: action.data };
    case PHOTOREQUEST_SWITCH_STATE_ERROR:
      return { ...state, requestUpdate: {} };
    case CONTACT_SUCCESS:
      return { ...state, contacted: true };
    case CONTACT_ERROR:
      return { ...state, contacted: false };
    case CONTACTMESSAGES_RECOVERED:
      return { ...state, messages: action.data };
    case CONTACTMESSAGES_ERROR:
      return { ...state, errors: data };
    case CONTACTMESSAGE_SWITCH_STATE:
      return { ...state, messageUpdate: action.data };
    case CONTACTMESSAGE_SWITCH_STATE_ERROR:
      return { ...state, messageUpdate: {} };
    case RESET_UNREGISTERED_UPLOAD:
      return { ...state, guestState: false}
    default:
      return state;
  }
}

export const selectWebAdminMessages = (state) => 
  state.webadmin.messages;

export const selectWebAdminMessageUpdate = (state) =>
  state.webadmin.messageUpdate;

export const selectWebAdminRequests = (state) => 
  state.webadmin.requests;

export const selectWebAdminRequestUpdate = (state) =>
  state.webadmin.requestUpdate;

export const selectWebAdminRequestDetail = (state) =>
  state.webadmin.requestDetail;

export const selectWebAdminAllTags = (state) => 
  state.webadmin.all_tags;

export const selectWebAdminContacted = (state) => 
  state.webadmin.contacted;

export const selectWebAdminNewsResult = (state) => 
  state.webadmin.news.results;

export const selectWebAdminNewCount = (state) => 
  state.webadmin.news.count;

export const selectWebAdminCarousel = (state) => 
  state.webadmin.caroussel;

export const selectWebAdminRequestPhotos = (state) =>
  state.webadmin.requestedPhotos;

export const selectWebAdminRequested = (state) => 
  state.webadmin.requested;
