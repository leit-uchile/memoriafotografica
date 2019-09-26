import {
  HOME_RECOVERED_PHOTOS,
  HOME_EMPTY_PHOTOS,
  HOME_RECOVERED_TAGS,
  HOME_EMPTY_TAGS,
  HOME_RECOVERED_CATEGORIES,
  HOME_EMPTY_CATEGORIES,
  HOME_RECOVERED_IPTCS,
  HOME_EMPTY_IPTCS,
  REQUESTPHOTO,
  HOME_LOADING
} from "../actions/types";

const initialState = {
  photos: [],
  all_tags: [],
  all_iptcs: [],
  all_cats: [],
  requestedPhotos: [],
  loading: false,
};

export default function home(state = initialState, action) {
  switch (action.type) {
    case HOME_RECOVERED_PHOTOS:
      return { ...state, photos: action.data, loading: false};
    case HOME_EMPTY_PHOTOS:
      return { ...state, errors: action.data, loading: false };
    case HOME_RECOVERED_TAGS:
      return { ...state, all_tags: action.data };
    case HOME_EMPTY_TAGS:
      return { ...state, all_tags: [] };
    case HOME_RECOVERED_CATEGORIES:
      return { ...state, all_cats: action.data };
    case HOME_EMPTY_CATEGORIES:
      return { ...state, all_cats: [] };
    case HOME_RECOVERED_IPTCS:
      return { ...state, all_iptcs: action.data };
    case HOME_EMPTY_IPTCS:
      return { ...state, all_iptcs: [] };
    case REQUESTPHOTO:
      return { ...state, requestedPhotos: [...state.requestedPhotos, action.data]}
    case HOME_LOADING:
      return {...state, loading: true};
    default:
      return state;
  }
}
