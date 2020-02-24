import {
  LANDING_LOADING,
  LANDING_RECOVERED_NEWS,
  LANDING_EMPTY_NEWS,
  LANDING_RECOVERED_CAROUSSEL,
  LANDING_CAROUSSEL_ERROR
} from "../actions/types";

const initialState = {
  loading: false,
  news: [],
  caroussel: [],
  errors: []
};

export default function landing(state = initialState, action) {
  const { type, data } = action;
  switch (type) {
    case LANDING_LOADING:
      return {...state, loading: true};
    case LANDING_RECOVERED_NEWS:
      return {...state, loading: false, news: data};
    case LANDING_EMPTY_NEWS:
      return {...state, loading: false, news: [], errors: data};
    case LANDING_RECOVERED_CAROUSSEL:
      return {...state, loading: false, caroussel: data[0].news};
    case LANDING_CAROUSSEL_ERROR:
      return {...state, loading: false, caroussel: [], errors: data};
    default:
      return state;
  }
}
