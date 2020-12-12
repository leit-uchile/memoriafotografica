import {
  RECOVERED_CATEGORIES,
  EMPTY_CATEGORIES,
  CREATED_CATEGORY,
  CREATED_CATEGORY_ERROR,
  CATEGORY_RESET_ERRORS,
  UPDATED_CATEGORY_ERROR,
  UPDATED_CATEGORY,
  DELETED_CATEGORY,
  DELETED_CATEGORY_ERROR,
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
  updatedCat: false,
  nbOperations: 0,
  opsCompleted: 0,
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
    case CATEGORY_RESET_ERRORS:
      return {
        ...state,
        error: "",
        nbOperations: action.data,
        opsCompleted: 0,
        updatedPhotos: false,
        updatedCat: false,
      };
    case CREATED_CATEGORY:
      return { ...state, newCat: action.data, updatedCat: true };
    case CREATED_CATEGORY_ERROR:
      return {
        ...state,
        error: "Hubo un error creando la categoría.",
        newCat: {},
        updatedCat: false,
      };
    case UPDATED_CATEGORY:
      return {
        ...state,
        error: "",
        categoryDetail: action.data,
        updatedCat: true,
      };
    case UPDATED_CATEGORY_ERROR:
      return { ...state, error: action.data, updatedCat: false };
    case DELETED_CATEGORY:
      return {
        ...state,
        opsCompleted: state.opsCompleted + 1,
        updatedCat: state.nbOperations === state.opsCompleted + 1,
      };
    case DELETED_CATEGORY_ERROR:
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

export const selectCategoriesError = (state) => state.categories.error;

export const selectCategoriesDetails = (state) =>
  state.categories.categoryDetail;

export const selectCategoriesUpdatePhotos = (state) =>
  state.categories.updatedPhotos;
  
export const selectCategoriesOpsCompleted = (state) =>
  state.categories.opsCompleted;

export const selectCategoriesUpdatedCat = (state) =>
  state.categories.updatedCat;

export const selectCategoriesTotal = (state) => state.categories.total;

export const selectNewCategories = (state) => state.categories.newCat;

export const selectCats = (state) => state.categories;
