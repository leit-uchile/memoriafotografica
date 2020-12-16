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
  total: 0,
  categoryDetail: {},
  updatedPhotos: false,
  catUpdate: {},
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
      return { ...state, categories: [], total: 0 };
    case CATEGORY_RESET_ERRORS:
      return {
        ...state,
        error: "",
        nbOperations: action.data,
        opsCompleted: 0,
        updatedPhotos: false,
      };
    case CREATED_CATEGORY:
      return {
        ...state,
        catUpdate: action.data
      };
    case CREATED_CATEGORY_ERROR:
      return {
        ...state,
        error: "Hubo un error creando la categoría.",
      };
    case UPDATED_CATEGORY:
      return {
        ...state,
        error: "",
        categoryDetail: action.data,
        catUpdate: action.data,
      };
    case UPDATED_CATEGORY_ERROR:
      return {
        ...state,
        error: action.data,

      };
    case DELETED_CATEGORY:
      return {
        ...state,
        opsCompleted: state.opsCompleted + 1,
        catUpdate: state.nbOperations === state.opsCompleted + 1 ? action.data : state.catUpdate,
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

export const selectCategoriesCatUpdate = (state) =>
  state.categories.catUpdate;

export const selectCategoriesTotal = (state) => state.categories.total;

export const selectCats = (state) => state.categories;
