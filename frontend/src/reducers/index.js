import albumcollection, * as fromAlbum from "./gallery/albumcollection";
import categories, * as fromCategories from "./gallery/categories";
import comments, * as fromComments from "./gallery/comments";
import metadata, * as fromMetaData from "./metadata";
import metrics, * as fromMetrics from "./metrics";
import photos, * as fromPhotos from "./gallery/photos";
import reports, * as fromReports from "./gallery/reports";
import site_misc, * as fromSiteMisc from "./site_misc";
import upload, * as fromUpload from "./upload";
import user, * as fromUser from "./user";
import webadmin, * as fromWebAdmin from "./webadmin";
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

export const selectPhotosUpdatedPhoto = (state) =>
  fromPhotos.selectPhotosUpdatedPhoto(state);

export const selectPhotosRefresh = (state) =>
  fromPhotos.selectPhotosRefresh(state);

// Categories
export const selectCats = (state) => fromCategories.selectCats(state);

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

export const selectAlbumResult = (state) => fromAlbum.selectAlbumResult(state);

export const selectAlbumCollections = (state) =>
  fromAlbum.selectAlbumCollections(state);

export const selectAlbumCollectionAlbumData = (state) =>
  fromAlbum.selectAlbumCollectionAlbumData(state);

//Comments
export const selectCommentsLoaded = (state) =>
  fromComments.selectCommentsLoaded(state);

export const selectComments = (state) => fromComments.selectComments(state);

//Metadata
export const selectMetaDataGeneralTags = (state) =>
  fromMetaData.selectMetaDataGeneralTags(state);

export const selectMetaDataAllIptcs = (state) =>
  fromMetaData.selectMetaDataAllIptcs(state);

export const selectMetaDataBatch = (state) =>
  fromMetaData.selectMetaDataBatch(state);

export const selectMetaDataOpsCompleted = (state) =>
  fromMetaData.selectMetaDataOpsCompleted(state);

export const selectMetaDataOpsErrors = (state) =>
  fromMetaData.selectMetaDataOpsErrors(state);

export const selectMetaDataGeneralTagsResult = (state) =>
  fromMetaData.selectMetaDataGeneralTagsResult(state);

export const selectMetaData = (state) => fromMetaData.selectMetaData(state);

export const selectMetaDataAllTags = (state) =>
  fromMetaData.selectMetaDataAllTags(state);

export const selectMetaDataCreating = (state) =>
  fromMetaData.selectMetaDataCreating(state);

export const selectMetaDataNewIds = (state) =>
  fromMetaData.selectMetaDataNewIds(state);

//SiteMisc
export const selectSiteMiscCuradorLoading = (state) =>
  fromSiteMisc.selectSiteMiscCuradorLoading(state);

export const selectSiteMiscHomeLoading = (state) =>
  fromSiteMisc.selectSiteMiscHomeLoading(state);

export const selectSiteMiscCuradorRefresh = (state) =>
  fromSiteMisc.selectSiteMiscCuradorRefresh(state);

export const selectSiteMiscMetaDataHelpDiscloure = (state) =>
  fromSiteMisc.selectSiteMiscMetaDataHelpDiscloure(state);

export const selectSiteMiscSearchMetaIDS = (state) =>
  fromSiteMisc.selectSiteMiscSearchMetaIDS(state);

export const selectSiteMiscLoginSuccesRoute = (state) =>
  fromSiteMisc.selectSiteMiscLoginSuccesRoute(state);

export const selectSiteMiscHomephotoPagination = (state) =>
  fromSiteMisc.selectSiteMiscHomephotoPagination(state);

export const selectSiteMiscCurrentRoute = (state) =>
  fromSiteMisc.selectSiteMiscCurrentRoute(state);

export const selectSiteMiscHomeSelectedIndex = (state) =>
  fromSiteMisc.selectSiteMiscHomeSelectedIndex(state);

export const selectSiteMiscUploadDisclosureSet = (state) =>
  fromSiteMisc.selectSiteMiscUploadDisclosureSet(state);

export const selectSiteMiscAlerts = (state) =>
  fromSiteMisc.selectSiteMiscAlerts(state);

//WebAdmin
export const selectWebAdminMessages = (state) =>
  fromWebAdmin.selectWebAdminMessages(state);

export const selectWebAdminUpdateMessage = (state) =>
  fromWebAdmin.selectWebAdminUpdateMessage(state);

export const selectWebAdminRequests = (state) =>
  fromWebAdmin.selectWebAdminRequests(state);

export const selectWebAdminRequestDetail = (state) =>
  fromWebAdmin.selectWebAdminRequestDetail(state);

export const selectWebAdminAllTags = (state) =>
  fromWebAdmin.selectWebAdminAllTags(state);

export const selectWebAdminContacted = (state) =>
  fromWebAdmin.selectWebAdminContacted(state);

export const selectWebAdminNewsResult = (state) =>
  fromWebAdmin.selectWebAdminNewsResult(state);

export const selectWebAdminNewCount = (state) =>
  fromWebAdmin.selectWebAdminNewCount(state);

export const selectWebAdminCarousel = (state) =>
  fromWebAdmin.selectWebAdminCarousel(state);

export const selectWebAdminRequested = (state) =>
  fromWebAdmin.selectWebAdminRequested(state);

export const selectWebAdminRequestPhotos = (state) =>
  fromWebAdmin.selectWebAdminRequestPhotos(state);

//Users
export const selectUserIsAuthenticated = (state) =>
  fromUser.selectUserIsAuthenticated(state);

export const selectErrors = (state) => fromUser.selectErrors(state);

export const selectUserToken = (state) => fromUser.selectUserToken(state);

export const selectUserData = (state) => fromUser.selectUserData(state);

export const selectUserActivate = (state) => fromUser.selectUserActivate(state);

export const selectUserRegisterSucces = (state) =>
  fromUser.selectUserRegisterSucces(state);

export const selectUserPhotos = (state) => fromUser.selectUserPhotos(state);

export const selectUserComments = (state) => fromUser.selectUserComments(state);

export const selectUserAlbums = (state) => fromUser.selectUserAlbums(state);

export const selectUserPublicUser = (state) =>
  fromUser.selectUserPublicUser(state);

export const selectUserPublicLoading = (state) =>
  fromUser.selectUserPublicLoading(state);

//Report
export const selectReportReport = (state) =>
  fromReports.selectReportReport(state);

export const selectReportUpdate = (state) =>
  fromReports.selectReportUpdate(state);

export const selectReportPhotoReportSent = (state) =>
  fromReports.selectReportPhotoReportSent(state);

export const selectReportComplete = (state) =>
  fromReports.selectReportComplete(state);

//Metrics
export const selectMetrics = (state) => fromMetrics.selectMetrics(state);

//Upload
export const selectUpload = (state) => fromUpload.selectUpload(state);
