import albumcollection, * as fromAlbum from "./gallery/albumcollection";
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

// Photos
export const selectPhotos = (state) => fromPhotos.selectPhotos(state);

export const selectPhotosCount = (state) => fromPhotos.selectPhotosCount(state);

export const selectPhotosDetails = (state) =>
  fromPhotos.selectPhotosDetails(state);

export const selectPhotosError = (state) => fromPhotos.selectPhotosError(state);

// Categories
export const selectCategories = (state) =>
  fromCategories.selectCategories(state);

export const selectCategoriesError = (state) =>
  fromCategories.selectCategoriesError(state);

export const selectCategoriesDetails = (state) =>
  fromCategories.selectCategoriesDetails(state);

export const selectCategoriesUpdatePhotos = (state) =>
  fromCategories.selectCategoriesUpdatePhotos(state);

export const selectCategoriesTotal = (state) =>
  fromCategories.selectCategoriesTotal(state);

export const selectNewCategories = (state) =>
  fromCategories.selectNewCategories(state);
// Albums

export const selectAlbums = (state) => fromAlbum.selectAlbums(state);

export const selectAlbumsLoading = (state) =>
  fromAlbum.selectAlbumsLoading(state);

export const selectAlbumsData = (state) => fromAlbum.selectAlbumsData(state);

export const selectErrors = (state) => fromUser.selectErrors(state);

export const selectComments = (state) => fromComments.selectComments(state);
