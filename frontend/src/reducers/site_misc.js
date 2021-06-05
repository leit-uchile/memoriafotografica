import {
  SET_ROUTE,
  INVISIBLE_ROUTE,
  ADD_LOGIN_SUCCESS_ROUTE,
  SET_ALERT,
  REMOVE_ALERT,
  SEARCH_PUT_META,
  SEARCH_REMOVE_META,
  HOME_LOADING,
  HOME_LOADED,
  HOME_SET_SELECTED_INDEX,
  HOME_PHOTO_PAGINATION,
  READ_UPLOAD_DISCLOSURE,
  NOTIFICATIONS_RECOVERED,
} from "../actions/types";

const initialState = {
  currentRoute: "/Inicio",
  loginSuccessRoute: "",
  alerts: [],
  searchMetaIDs: [],
  home: {
    loading: false,
    selectedIndex: -1,
    photoPagination: {},
  },
  uploadDisclosureSet: localStorage.getItem("upload_disclosed") === "true" ? true : false,
  notifications: {
    results: [],
    count: 0,
  },
};

export default function site_misc(state = initialState, action) {
  var newMetaIDs;
  switch (action.type) {
    case SET_ROUTE:
      return { ...state, currentRoute: action.data };
    case INVISIBLE_ROUTE:
      return { ...state, currentRoute: undefined };
    case ADD_LOGIN_SUCCESS_ROUTE:
      return { ...state, loginSuccessRoute: action.data };
    case SET_ALERT:
      return { ...state, alerts: [...state.alerts, action.data] };
    case REMOVE_ALERT:
      var res = state.alerts.filter((alert) => alert.id !== action.data);
      return { ...state, alerts: res };
    case SEARCH_PUT_META:
      newMetaIDs = state.searchMetaIDs.filter(
        (el) => el.metaID !== action.data.metaID
      );
      return { ...state, searchMetaIDs: [...newMetaIDs, action.data] };
    case SEARCH_REMOVE_META:
      newMetaIDs = state.searchMetaIDs.filter(
        (el) => el.metaID !== action.data.metaID
      );
      return { ...state, searchMetaIDs: [...newMetaIDs] };
    case HOME_LOADING:
      return { ...state, home: { ...state.home, loading: true } };
    case HOME_LOADED:
      return { ...state, home: { ...state.home, loading: false } };
    case HOME_SET_SELECTED_INDEX:
      return { ...state, home: { ...state.home, selectedIndex: action.data } };
    case HOME_PHOTO_PAGINATION:
      return {
        ...state,
        home: { ...state.home, photoPagination: action.data },
      };
    case READ_UPLOAD_DISCLOSURE:
      localStorage.setItem("upload_disclosed", true);
      return { ...state, uploadDisclosureSet: true };
    case NOTIFICATIONS_RECOVERED:
      return {
        ...state,
        notifications: action.data,
      };
    default:
      return { ...state };
  }
}


export const selectSiteMiscHomeLoading = (state) => state.site_misc.home.loading;

export const selectSiteMiscSearchMetaIDS = (state) => state.site_misc.searchMetaIDs;

export const selectSiteMiscLoginSuccesRoute = (state) => state.site_misc.loginSuccessRoute;

export const selectSiteMiscHomeSelectedIndex = (state) => state.site_misc.home.selectedIndex;

export const selectSiteMiscHomephotoPagination = (state) => state.site_misc.home.photoPagination;

export const selectSiteMiscCurrentRoute = (state) => state.site_misc.currentRoute;

export const selectSiteMiscUploadDisclosureSet = (state) => state.site_misc.uploadDisclosureSet;

export const selectSiteMiscAlerts = (state) => state.site_misc.alerts;

export const selectSiteMiscNotifications = (state) => state.site_misc.notifications;