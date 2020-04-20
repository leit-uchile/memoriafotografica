import {
  CREATED_COMMENT,
  NEW_COMMENT_ERROR,
  RECOVERED_PHOTO_COMMENTS,
  PHOTO_COMMENTS_ERROR,
  LOADING_COMMENT,
  UPDATED_COMMENT,
  DELETED_COMMENT,
  DELETE_COMMENT_ERROR,
} from "../../actions/types";

const initialState = {
  commentsLoaded: false,
  comments: [],
  errors: "INVALID_URL",
};

export default function photoDetails(state = initialState, action) {
  switch (action.type) {
    case CREATED_COMMENT:
      return { ...state, new_comment: action.data, commentsLoaded: false };
    case UPDATED_COMMENT:
      let newComments = [];
      state.comments.forEach( comment =>{
        if(comment.id !== action.data.id){
          newComments.push(comment)
        } else {
          newComments.push({...comment, content: action.data})
        }
      })
      return { ...state, comments: [newComments], commentsLoaded: false };
    case NEW_COMMENT_ERROR:
      return { ...state, new_comment_errors: action.data };
    case DELETED_COMMENT:
      let prevComments = [];
      state.comments.forEach( comment =>{
        if(comment.id !== action.data.id){
          prevComments.push(comment)
        }
      })
      return { ...state, comments: [prevComments], commentsLoaded: false };
    case DELETE_COMMENT_ERROR:
      return { ...state, delete_comment_errors: action.data };
    case LOADING_COMMENT:
      return { ...state, comments: [...state.comments, { ...action.data }], commentsLoaded: true };
    case RECOVERED_PHOTO_COMMENTS:
      return { ...state, comments: action.data, commentsLoaded: true };
    case PHOTO_COMMENTS_ERROR:
      return { ...state, comments: [], commentsLoaded: false };
    default:
      return state;
  }
}
