import {
  RECOVERED_PHOTOS,
  EMPTY_PHOTOS,
  PHOTO_RESET_NB_OPS,
  EDIT_PHOTO_UPDATING,
  EDIT_PHOTO,
  EDIT_PHOTO_ERROR,
  DELETED_PHOTO,
  PHOTO_DETAILS_LOADING,
  PHOTO_DETAILS_LOADED,
  PHOTO_DETAILS_ERROR,
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
  itemStatus: 'idle',
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
        itemStatus: 'idle'
      };
    case EDIT_PHOTO_UPDATING:
      return {...state, itemStatus: 'loading'};
    case EDIT_PHOTO:
      return {
        ...state,
        opsCompleted: state.opsCompleted +1,
        photoUpdate: state.nbOperations === state.opsCompleted + 1 ? action.data : state.photoUpdate,
        itemStatus: state.nbOperations === state.opsCompleted + 1 ? 'idle' : 'loading'
      };
    case EDIT_PHOTO_ERROR:
      return { ...state, itemStatus: 'failure', opsErrors: [...state.opsErrors, action.data] };
    case DELETED_PHOTO:
      let newList = state.photos.filter((photo) => photo.id !== action.data.id);
      return {
        ...state,
        photos: [newList],
        opsCompleted: state.opsCompleted +1,
        photoUpdate: state.nbOperations === state.opsCompleted + 1 ? action.data : state.photoUpdate,
        itemStatus: state.nbOperations === state.opsCompleted + 1 ? 'idle' : 'loading'
      };
    case PHOTO_DETAILS_LOADING:
        return { ...state, itemStatus: 'loading' };
    case PHOTO_DETAILS_LOADED:
      return { ...state, itemStatus: 'success', details: action.data, opsErrors: [] };
    case PHOTO_DETAILS_ERROR:
      return {
        ...state,
        itemStatus: 'failure',
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

export const selectPhotosItemStatus = (state) => state.photos.itemStatus;
