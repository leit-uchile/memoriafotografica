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
  opsFinished: 0,
  disclosureSet: localStorage.getItem("disclosed") == "true" ? true : false
};

export default function upload(state = initialState, action) {
  let counter;
  switch (action.type) {
    case "UPLOADING":
      return {
        ...state,
        uploading: true,
        photosUploading: action.data, // Nb of photos to be uploaded
        opsFinished: 0,
        photosUploaded: []
      };
    case "UPLOADED_PHOTO":
      counter = state.opsFinished + 1;
      return {
        ...state,
        photosUploaded: [...state.photosUploaded, action.data.key],
        opsFinished: counter,
        uploading: !(counter === state.photosUploading)
      };
    case "ERROR_UPLOADING":
      counter = state.opsFinished + 1;
      // Assume that a component will resolve the id in action.data
      return {
        ...state,
        opsFinished: counter,
        uploading: !(counter === state.photosUploading),
        error: action.data
      };
    case "READ_DISCLOSURE":
      localStorage.setItem("disclosed", true);
      return { ...state, disclosureSet: true };
    default:
      return { ...state };
  }
}
