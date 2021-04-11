import {
  RECOVERED_PHOTOS,
  EMPTY_PHOTOS,
  RECOVERED_PHOTO_DETAILS,
  PHOTO_DETAILS_ERROR,
  PHOTO_RESET_NB_OPS,
  EDIT_PHOTO,
  EDIT_PHOTO_ERROR,
  DELETED_PHOTO,
} from "../../actions/types";

const initialState = {
  photos: [],
  count: 0,
  nbOperations: 0,
  opsCompleted: 0,
  opsErrors: [],
  photoUpdate: {},
  details: {
    title: "[Titulo]",
    image: undefined,
    desc: undefined,
    permission: [],
    category: [],
    metadata: [],
  },
};

export default function photos(state = initialState, action) {
  switch (action.type) {
    case RECOVERED_PHOTOS:
      return {
        ...state,
        photos: action.data.results,
        count: action.data.count,
      };
    case EMPTY_PHOTOS:
      return { ...state, photos: [], count: 0 };
    case PHOTO_RESET_NB_OPS:
      return {
        ...state,
        nbOperations: action.data,
        opsCompleted: 0,
        opsErrors: [],
      };
    case EDIT_PHOTO:
      return {
        ...state,
        opsCompleted: state.opsCompleted +1,
        photoUpdate: state.nbOperations === state.opsCompleted + 1 ? action.data : state.photoUpdate,
      };
    case EDIT_PHOTO_ERROR:
      return { ...state, opsErrors: [...state.opsErrors, action.data] };
    case DELETED_PHOTO:
      let newList = state.photos.filter((photo) => photo.id !== action.data.id);
      return {
        ...state,
        photos: [newList],
        opsCompleted: state.opsCompleted +1,
        photoUpdate: state.nbOperations === state.opsCompleted + 1 ? action.data : state.photoUpdate,
      };
    case RECOVERED_PHOTO_DETAILS:
      return { ...state, details: action.data, opsErrors: [] };
    case PHOTO_DETAILS_ERROR:
      return {
        ...state,
        opsErrors: [...state.opsErrors, action.data],
        details: {
          title: "[Titulo]",
          image: undefined,
          desc: undefined,
          permission: [],
          category: [],
          metadata: [],
        },
      };

    default:
      return state;
  }
}

export const selectPhotos = (state) => {
  if (Array.isArray(state.photos.photos)) {
    return state.photos.photos;
  } else {
    return [];
  }
};

export const selectPhotosCount = (state) => state.photos.count;

export const selectPhotosDetails = (state) => state.photos.details;

export const selectPhotosOpsCompleted = (state) => state.photos.opsCompleted;

export const selectPhotosOpsErrors = (state) => state.photos.opsErrors;

export const selectPhotosPhotoUpdate = (state) => state.photos.photoUpdate;
