import {
  RECOVERED_CATEGORIES,
  EMPTY_CATEGORIES,
  RECOVERED_PHOTOS,
  EMPTY_PHOTOS,
  RECOVERED_REPORT,
  EMPTY_REPORTS,
  CURADOR_LOADING,
  CREATED_CATEGORY,
  CREATED_CATEGORY_ERROR,
  GET_GENERAL_STATS,
  GET_GENERAL_STATS_ERROR
} from "../actions/types";

const initialState = {
  reports: [],
  photos: [],
  categories: [],
  loading: false,
  error: "",
  refresh: false,
  stats: {
    general: null
  }
};

export default function curador(state = initialState, action) {
  switch (action.type) {
    case RECOVERED_CATEGORIES:
      return { ...state, categories: action.data };
    case EMPTY_CATEGORIES:
      return { ...state, categories: [] };
    case RECOVERED_PHOTOS:
      return { ...state, photos: action.data, loading: false };
    case EMPTY_PHOTOS:
      return { ...state, photos: [] };
    case RECOVERED_REPORT:
      return { ...state, reports: action.data };
    case EMPTY_REPORTS:
      return { ...state, reports: [] };
    case CURADOR_LOADING:
      return { ...state, loading: true };
    case "COMPLETED":
      return { ...state, loading: false };
    case CREATED_CATEGORY:
      return { ...state, loading: false };
    case "REFRESH":
      return { ...state, refresh: true };
    case CREATED_CATEGORY_ERROR:
      return {
        ...state,
        loading: false,
        error: "Hubo un error creando la categoría."
      };
    case "ERROR_DELETING":
      return {
        ...state,
        loading: false,
        error: "Hubo un error eliminando la categoría."
      };
    case "ERROR":
      return {
        ...state,
        loading: false,
        error:
          "Se produjo un error, intente nuevamente. Si persiste, contacte gente especializada."
      };
    case GET_GENERAL_STATS:
      return {
        ...state,
        stats: {
          ...state.stats,
          general: action.data,
        },
      }
    case GET_GENERAL_STATS_ERROR:
      return {
        ...state,
        error: action.data
      }
    default:
      return state;
  }
}
