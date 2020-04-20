import {
  RECOVERED_CATEGORIES,
  EMPTY_CATEGORIES,
  CREATED_CATEGORY,
  CREATED_CATEGORY_ERROR,
} from "../../actions/types";

const initialState = {
  categories: [],
  error: "",
  total: -1,
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
      };
    case CREATED_CATEGORY:
      return { ...state, loading: false };
    default:
      return state;
  }
}
