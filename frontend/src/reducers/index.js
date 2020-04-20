import albumcollection from "./gallery/albumcollection";
import categories from "./gallery/categories";
import comments from "./gallery/comments";
import metadata from "./metadata";
import metrics from "./metrics";
import photos from "./gallery/photos";
import reports from "./gallery/reports";
import site_misc from "./site_misc";
import upload from "./upload";
import user from "./user";
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
