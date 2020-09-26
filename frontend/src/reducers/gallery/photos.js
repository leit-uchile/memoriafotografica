import {
  RECOVERED_PHOTOS,
  EMPTY_PHOTOS,
  RECOVERED_PHOTO_DETAILS,
  PHOTO_DETAILS_ERROR,
  EDIT_PHOTO,
  EDIT_PHOTO_ERROR,
  DELETED_PHOTO,
} from "../../actions/types";

const initialState = {
  photos: [],
  errors: null,
  refresh: false,
  updatedPhoto: false,
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
      return { ...state, photos: [] };
    case EDIT_PHOTO:
      return {
        ...state,
        details: { ...state.details, ...action.data },
        updatedPhoto: true,
      };
    case EDIT_PHOTO_ERROR:
      return { ...state, edit_photo_errors: action.data };
    case DELETED_PHOTO:
      let newList = state.photos.filter((photo) => photo.id !== action.data.id);
      return { ...state, photos: [newList], updatedPhoto: true, refresh: true };
    case RECOVERED_PHOTO_DETAILS:
      return { ...state, details: action.data, errors: null };
    case PHOTO_DETAILS_ERROR:
      return {
        ...state,
        errors: action.data,
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
