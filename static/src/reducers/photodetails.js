import {
  RECOVERED_PHOTO_DETAILS,
  PHOTO_DETAILS_ERROR,
  CREATED_COMMENT,
  NEW_COMMENT_ERROR,
  RECOVERED_PHOTO_COMMENTS,
  PHOTO_COMMENTS_ERROR,
  LOADED_CUSTOM_METADATA,
  CUSTOM_METADATA_ERROR,
  REPORTED_PHOTO,
  PHOTO_REPORT_FAILED,
  REPORTING_PHOTO
} from "../actions/types";

const initialState = {
  details: {
    title: "[Titulo]",
    image: undefined,
    desc: undefined,
    permission: [],
    metadata: []
  },
  errors: "INVALID_URL",
  commentsLoaded: false,
  comments: [],
  metadataNames: [],
  photoReportSent: false,
  reportComplete: false,
};

export default function photoDetails(state = initialState, action) {
  switch (action.type) {
    case RECOVERED_PHOTO_DETAILS:
      return { ...state, details: action.data };
    case PHOTO_DETAILS_ERROR:
      return { ...state, errors: action.data };
    case CREATED_COMMENT:
      return { ...state, new_comment: action.data, commentsLoaded: false };
    case NEW_COMMENT_ERROR:
      return { ...state, new_comment_errors: action.data };
    case RECOVERED_PHOTO_COMMENTS:
      return { ...state, comments: action.data, commentsLoaded: true };
    case PHOTO_COMMENTS_ERROR:
      return { ...state, comments: [], commentsLoaded: false };
    case LOADED_CUSTOM_METADATA:
      return { ...state, metadataNames: action.data };
    case CUSTOM_METADATA_ERROR:
      return { ...state, metadataNames: [] };
    case REPORTING_PHOTO:
      return { ...state, photoReportSent: false};
    case REPORTED_PHOTO:
      return {...state, photoReportSent: true, reportComplete: true}
    case PHOTO_REPORT_FAILED:
        return {...state, photoReportSent: true, reportComplete: false}
    default:
      return state;
  }
}
