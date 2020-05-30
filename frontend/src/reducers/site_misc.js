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
  CURADOR_LOADING,
  CURADOR_COMPLETED,
  CURADOR_REFRESH,
  READ_UPLOAD_DISCLOSURE,
  SET_METADATA_HELP_DISCLOSURE,
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
  curador: {
    loading: false,
    refresh: false,
  },
  uploadDisclosureSet: localStorage.getItem("upload_disclosed") === "true" ? true : false,
  metadataHelpDisclosure: localStorage.getItem("metadata_help_disclosed") === "true" ? true : false,
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
    case CURADOR_LOADING:
      return { ...state, curador: { ...state.curador, loading: true } };
    case CURADOR_COMPLETED:
      return { ...state, curador: { ...state.curador, loading: false } };
    case CURADOR_REFRESH:
      return { ...state, curador: { ...state.curador, refresh: true } };
    case READ_UPLOAD_DISCLOSURE:
      localStorage.setItem("upload_disclosed", true);
      return { ...state, uploadDisclosureSet: true };
    case SET_METADATA_HELP_DISCLOSURE:
      localStorage.setItem("metadata_help_disclosed", action.data);
      return { ...state, metadataHelpDisclosure: action.data };
    default:
      return { ...state };
  }
}
