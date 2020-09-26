import albumcollection from "./gallery/albumcollection";
import categories, * as fromCategories from "./gallery/categories";
import comments, * as fromComments from "./gallery/comments";
import metadata from "./metadata";
import metrics from "./metrics";
import photos, * as fromPhotos from "./gallery/photos";
import reports from "./gallery/reports";
import site_misc from "./site_misc";
import upload from "./upload";
import user, * as fromUser from "./user";
import webadmin from "./webadmin";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  albumcollection,
  categories,
  comments,
  metadata,
  metrics,
  photos,
  reports,
  site_misc,
  upload,
  user,
  webadmin,
});

export default rootReducer;

export const selectPhotos = (state) => fromPhotos.selectPhotos(state);

export const selectCategories = (state) =>
  fromCategories.selectCategories(state);

export const selectErrors = (state) => fromUser.selectErrors(state);

export const selectComments = (state) => fromComments.selectComments(state);
