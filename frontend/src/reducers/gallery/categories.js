import {
  RECOVERED_CATEGORIES,
  EMPTY_CATEGORIES,
  CREATED_CATEGORY,
  CREATED_CATEGORY_ERROR,
  CATEGORY_RESET_ERRORS
} from "../../actions/types";

const initialState = {
  categories: [],
  error: "",
  total: -1,
  newCat: {}
};

export default function categories(state = initialState, action) {
  switch (action.type) {
    case RECOVERED_CATEGORIES:
      return { ...state, categories: action.data.results, total: action.data.count };
    case EMPTY_CATEGORIES:
      return { ...state, categories: [], count: 0 };
    case CREATED_CATEGORY_ERROR:
      return {
        ...state,
        loading: false,
        error: "Hubo un error creando la categoría.",
        newCat: {}
      };
    case CREATED_CATEGORY:
      return { ...state, loading: false, newCat: action.data };
    case CATEGORY_RESET_ERRORS:
      return {...state, error: ""}
    default:
      return state;
  }
}
