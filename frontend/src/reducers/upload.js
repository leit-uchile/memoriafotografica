import {
  UPLOADING,
  UPLOADED_PHOTO,
  ERROR_UPLOADING_PHOTO,
} from "../actions/types";

const initialState = {
  uploading: false,
  photosUploading: 0,
  photosUploaded: [],
  newPhotosIds: [],
  opsFinished: 0,
  error: [],
};

export default function upload(state = initialState, action) {
  let counter;
  switch (action.type) {
    case UPLOADING:
      return {
        ...state,
        uploading: true,
        photosUploading: action.data, // Nb of photos to be uploaded
        opsFinished: 0,
        photosUploaded: [],
        newPhotosIds: [],
        error: [],
      };
    case UPLOADED_PHOTO:
      counter = state.opsFinished + 1;
      return {
        ...state,
        photosUploaded: [...state.photosUploaded, action.data.photo_index],
        newPhotosIds: [...state.newPhotosIds, action.data.photo_id],
        opsFinished: counter,
        uploading: !(counter === state.photosUploading)
      };
    case ERROR_UPLOADING_PHOTO:
      counter = state.opsFinished + 1;
      // Assume that a component will resolve the id in action.data
      return {
        ...state,
        opsFinished: counter,
        uploading: !(counter === state.photosUploading),
        error: [...state.error, action.data]
      };
    default:
      return { ...state };
  }
}
