import {
  RECOVERED_PHOTOS,
  EMPTY_PHOTOS,
  RECOVERED_PHOTO_DETAILS,
  PHOTO_DETAILS_ERROR,
  EDIT_PHOTO,
  EDIT_PHOTO_ERROR,
} from "../../actions/types";

const initialState = {
  photos: [],
  errors: null,
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
      return { ...state, details: { ...state.details, ...action.data } };
    case EDIT_PHOTO_ERROR:
      return { ...state, edit_photo_errors: action.data };
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
