import {
  RECOVERED_CATEGORIES,
  EMPTY_CATEGORIES,
  CREATED_CATEGORY,
  CREATED_CATEGORY_ERROR,
  CATEGORY_RESET_ERRORS,
  UPDATED_CATEGORY_ERROR,
  UPDATED_CATEGORY,
  RECOVERED_CATEGORY,
  RECOVERED_CATEGORY_ERROR,
  UPDATED_CATEGORY_PHOTOS,
  UPDATED_CATEGORY_PHOTOS_ERROR,
} from "../../actions/types";

const initialState = {
  categories: [],
  error: "",
  total: -1,
  newCat: {},
  categoryDetail: {},
  updatedPhotos: false,
};

export default function categories(state = initialState, action) {
  switch (action.type) {
    case RECOVERED_CATEGORIES:
      return {
        ...state,
        categories: action.data.results,
        total: action.data.count,
      };
    case EMPTY_CATEGORIES:
      return { ...state, categories: [], count: 0 };
    case CREATED_CATEGORY_ERROR:
      return {
        ...state,
        loading: false,
        error: "Hubo un error creando la categoría.",
        newCat: {},
      };
    case CREATED_CATEGORY:
      return { ...state, loading: false, newCat: action.data };
    case CATEGORY_RESET_ERRORS:
      return { ...state, error: "", updatedPhotos: false };
    case UPDATED_CATEGORY:
      return { ...state, error: "", categoryDetail: action.data };
    case UPDATED_CATEGORY_ERROR:
      return { ...state, error: action.data };
    case RECOVERED_CATEGORY:
      return { ...state, categoryDetail: action.data };
    case RECOVERED_CATEGORY_ERROR:
      return { ...state, categoryDetail: {}, error: action.data };
    case UPDATED_CATEGORY_PHOTOS:
      return { ...state, updatedPhotos: true };
    case UPDATED_CATEGORY_PHOTOS_ERROR:
      return { ...state, updatedPhotos: true, error: action.data };
    default:
      return state;
  }
}

export const selectCategories = (state) => {
  if (Array.isArray(state.categories.categories)) {
    return state.categories.categories;
  } else {
    return [];
  }
};
