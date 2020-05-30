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
} from "../actions/types";

const initialState = {
  loading: false,
  news: [],
  caroussel: [],
  errors: [],
  requestedPhotos: [],
  requested: false,
  requests: [],
  contacted: false
};

export default function webadmin(state = initialState, action) {
  const { type, data } = action;
  switch (type) {
    case LANDING_LOADING:
      return {...state, loading: true};
    case NEWS_RECOVERED:
      return {...state, loading: false, news: data};
    case NEWS_EMPTY:
      return {...state, loading: false, news: [], errors: data};
    case CAROUSSEL_RECOVERED:
      return {...state, loading: false, caroussel: data[0].news};
    case CAROUSSEL_ERROR:
      return {...state, loading: false, caroussel: [], errors: data};
    case REQUESTPHOTO:
      let filtered = state.requestedPhotos.filter(
        el => el.id !== action.data.id
      );
      return { ...state, requestedPhotos: [...filtered, action.data], requested: false };
    case REMOVE_REQUESTPHOTO:
      let filtered2 = state.requestedPhotos.filter(
        el => el.id !== action.data.id
      );
      return { ...state, requestedPhotos: [...filtered2] };
    case SEND_REQUESTPHOTO:
      return { ...state, requestedPhotos: [], requested: true }

    case PHOTOREQUESTS_RECOVERED:
      return { ...state, requests: action.data}
    case PHOTOREQUESTS_ERROR:
      return { ...state, errors: data}

    
    case CONTACT_SUCCESS:
      return { ...state, contacted: true }
    case CONTACT_ERROR:
      return { ...state, contacted: false }
    default:
      return state;
  }
}
