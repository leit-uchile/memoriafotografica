import {
  UPLOADING,
  UPLOADED_PHOTO,
  ERROR_UPLOADING_PHOTO,
  READ_UPLOAD_DISCLOSURE,
  CREATE_ALBUM_SENT,
  CREATED_ALBUM,
  CREATED_ALBUM_ERROR
} from "../actions/types";

/*
  To upload we have a counter of current operations,
  an array to store successuf photos ids or keys,
  and a state of the overall operation (aka uploading).

  Error handling should happen on the component
  checking missing ids from the array
*/
const initialState = {
  uploading: false,
  photosUploading: 0,
  photosUploaded: [],
  newPhotosIds: [],
  opsFinished: 0,
  disclosureSet: localStorage.getItem("disclosed") === "true" ? true : false,
  error: [],
  createAlbum: {sent: false, success: false},
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
    case READ_UPLOAD_DISCLOSURE:
      localStorage.setItem("disclosed", true);
      return { ...state, disclosureSet: true };
    case CREATE_ALBUM_SENT:
      return {...state, createAlbum: {sent: false, success: false}};
    case CREATED_ALBUM:
      return {...state, createAlbum: {sent: true, success: true}};
    case CREATED_ALBUM_ERROR:
      return {...state, createAlbum: {sent: true, success: false}};
    default:
      return { ...state };
  }
}
