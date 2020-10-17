// ALBUM
export const ALBUMS_LOADED = "ALBUMS_LOADED";
export const ALBUMS_EMPTY = "ALBUMS_EMPTY";
export const ALBUM_LOADING = "ALBUM_LOADING";
export const ALBUM_LOADED = "ALBUM_LOADED";
export const ALBUM_LOADING_ERROR = "ALBUM_LOADING_ERROR";
export const CREATE_ALBUM_SENT = "CREATE_ALBUM_SENT";
export const CREATED_ALBUM = "CREATE_ALBUM";
export const CREATED_ALBUM_ERROR = "CREATED_ALBUM_ERROR";

// CATEGORIES
export const CREATED_CATEGORY = "CREATED_CATEGORY";
export const CREATED_CATEGORY_ERROR = "CREATED_CATEGORY_ERROR";
export const RECOVERED_CATEGORIES = "RECOVERED_CATEGORIES";
export const EMPTY_CATEGORIES = "EMPTY_CATEGORIES";
export const RECOVERED_CATEGORY = "RECOVERED_CATEGORY";
export const RECOVERED_CATEGORY_ERROR = "RECOVERED_CATEGORY_ERROR";
export const CATEGORY_RESET_ERRORS = "CATEGORY_RESET_ERRORS";
export const UPDATED_CATEGORY = "UPDATED_CATEGORY";
export const UPDATED_CATEGORY_ERROR = "UPDATED_CATEGORY_ERROR";
export const UPDATED_CATEGORY_PHOTOS = "UPDATED_CATEGORY_PHOTOS";
export const UPDATED_CATEGORY_PHOTOS_ERROR = "UPDATED_CATEGORY_PHOTOS_ERROR";

// COMMENTS
export const RECOVERED_PHOTO_COMMENTS = "RECOVERED_PHOTO_COMMENTS";
export const PHOTO_COMMENTS_ERROR = "PHOTO_COMMENTS_ERROR";
export const CREATED_COMMENT = "CREATED_COMMENT";
export const UPDATED_COMMENT = "UPDATED_COMMENT";
export const NEW_COMMENT_ERROR = "NEW_COMMENT_ERROR";
export const DELETED_COMMENT = "DELETED_COMMENT";
export const DELETE_COMMENT_ERROR = "DELETE_COMMENT_ERROR";
export const LOADING_COMMENT = "LOADING_COMMENT";

// METADATA
export const RECOVERED_TAGS = "RECOVERED_TAGS";
export const EMPTY_TAGS = "EMPTY_TAGS";
export const RECOVERED_CURADOR_TAGS = "RECOVERED_CURADOR_TAGS";
export const EMPTY_CURADOR_TAGS = "EMPTY_CURADOR_TAGS";
export const RECOVERED_IPTCS = "RECOVERED_IPTCS";
export const EMPTY_IPTCS = "EMPTY_IPTCS";
export const CREATED_METADATA = "CREATED_METADATA";
export const CREATING_METADATA = "CREATING_METADATA";
export const CREATED_METADATA_ERROR = "CREATED_METADATA_ERROR";
export const RESET_METADATA_STORE = "RESET_METADATA_STORE";
export const LOADED_CUSTOM_METADATA = "LOADED_CUSTOM_METADATA";
export const CUSTOM_METADATA_ERROR = "CUSTOM_METADATA_ERROR";
export const RECOVERED_METADATA_BATCH = "RECOVERED_METADATA_BATCH";
export const EMPTY_METADATA_BATCH = "EMPTY_METADATA_BATCH";
export const UPDATED_METADATA = "UPDATED_METADATA";
export const UPDATED_METADATA_ERROR = "UPDATED_METADATA_ERROR";
export const DELETED_METADATA = "DELETED_METADATA";
export const DELETED_METADATA_ERROR = "DELETED_METADATA_ERROR";
export const METADATA_RESET_NB_OPS = "METADATA_RESET_NB_OPS";
export const METADATA_MERGE = "METADATA_MERGE";
export const METADATA_MERGE_ERROR = "METADATA_MERGE_ERROR";

// METRICS
export const GET_GENERAL_STATS = "GET_GENERAL_STATS";
export const GET_GENERAL_STATS_ERROR = "GET_GENERAL_STATS_ERROR";

// MISC
// routing
export const INVISIBLE_ROUTE = "INVISIBLE_ROUTE";
export const SET_ROUTE = "SET_ROUTE";
export const ADD_LOGIN_SUCCESS_ROUTE = "ADD_LOGIN_SUCCESS_ROUTE";
// alerts
export const SET_ALERT = "SET_ALERT";
export const REMOVE_ALERT = "REMOVE_ALERT";
export const HOME_LOADING = "HOME_LOADING";
export const HOME_LOADED = "HOME_LOADED";
export const HOME_SET_SELECTED_INDEX = "HOME_SET_SELECTED_INDEX";
export const HOME_PHOTO_PAGINATION = "HOME_PHOTO_PAGINATION";
export const LANDING_LOADING = "LANDING_LOADING";
export const CURADOR_LOADING = "CURADOR_LOADING";
// search
export const SEARCH_PUT_META = "SEARCH_PUT_META";
export const SEARCH_REMOVE_META = "SEARCH_REMOVE_META";
// upload
export const READ_UPLOAD_DISCLOSURE = "READ_UPLOAD_DISCLOSURE";
// curador
export const CURADOR_REFRESH = "CURADOR_REFRESH";
export const CURADOR_COMPLETED = "CURADOR_COMPLETED";
export const SET_METADATA_HELP_DISCLOSURE = "SET_METADATA_HELP_DISCLOSURE";

// PHOTOS
export const RECOVERED_PHOTOS = "RECOVERED_PHOTOS";
export const EMPTY_PHOTOS = "EMPTY_PHOTOS";
export const DELETED_PHOTO = "DELETED_PHOTO";
export const RECOVERED_PHOTO_DETAILS = "RECOVERED_PHOTO_DETAILS";
export const PHOTO_DETAILS_ERROR = "PHOTO_DETAILS_ERROR";
export const EDIT_PHOTO = "EDIT_PHOTO";
export const EDIT_PHOTO_ERROR = "EDIT_PHOTO_ERROR";
export const UPLOADING = "UPLOADING";
export const UPLOADED_PHOTO = "UPLOADED_PHOTO";
export const ERROR_UPLOADING_PHOTO = "ERROR_UPLOADING_PHOTO";

// REPORTS
export const RECOVERED_REPORT = "RECOVERED_REPORT";
export const EMPTY_REPORTS = "EMPTY_REPORTS";
export const REPORT_SWITCH_STATE = "REPORT_SWITCH_STATE";
export const REPORT_SWITCH_STATE_ERROR = "REPORT_SWITCH_STATE_ERROR";
export const REPORT_NEW = "REPORT_NEW";
export const REPORT_COMPLETED = "REPORT_COMPLETED";
export const REPORT_FAILED = "REPORT_FAILED";

// USER
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const AUTH_ERROR = "AUTH_ERROR";
export const REGISTRATION_SUCCESS = "REGISTRATION_SUCCESS";
export const REGISTRATION_FAILED = "REGISTRATION_FAILED";
export const AUTH_CLEAR_ERRORS = "AUTH_CLEAR_ERRORS";
export const REGISTRATION_LINK_SUCCESS = "REGISTRATION_LINK_SUCCESS";
export const REGISTRATION_LINK_FAILED = "REGISTRATION_LINK_FAILED";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const USER_LOADED = "USER_LOADED";
export const USER_UPDATE_SUCCESS = "USER_UPDATE_SUCCESS";
export const USER_UPDATE_FAILED = "USER_UPDATE_FAILED";
export const USER_RECOVERED_PHOTO = "USER_RECOVERED_PHOTO";
export const USER_RECOVERED_PHOTO_ERROR = "USER_RECOVERED_PHOTO_ERROR";
export const USER_RECOVERED_ALBUM = "USER_RECOVERED_ALBUM";
export const USER_RECOVERED_ALBUM_ERROR = "USER_RECOVERED_ALBUM_ERROR";
export const USER_RECOVERED_COMMENTS = "USER_RECOVERED_COMMENTS";
export const USER_RECOVERED_COMMENTS_ERROR = "USER_RECOVERED_COMMENTS_ERROR";
export const USER_PASSWORD_UPDATED = "USER_PASSWORD_UPDATED";
export const USER_PASSWORD_UPDATE_FAILED = "USER_PASSWORD_UPDATE_FAILED";
export const USER_PUBLIC_LOADING = "USER_PUBLIC_LOADING";
export const USER_PUBLIC_LOADED = "USER_PUBLIC_LOADED";
export const USER_PUBLIC_ERROR = "USER_PUBLIC_ERROR";

// WEBADMIN
export const NEWS_RECOVERED = "NEWS_RECOVERED";
export const NEWS_EMPTY = "NEWS_EMPTY";
export const CAROUSSEL_RECOVERED = "CAROUSSEL_RECOVERED";
export const CAROUSSEL_ERROR = "CAROUSSEL_ERROR";
export const REQUESTPHOTO = "REQUESTPHOTO";
export const REMOVE_REQUESTPHOTO = "REMOVE_REQUESTPHOTO";
export const SEND_REQUESTPHOTO = "SEND_REQUESTPHOTO";
export const PHOTOREQUESTS_RECOVERED = "PHOTOREQUESTS_RECOVERED";
export const PHOTOREQUESTS_ERROR = "PHOTOREQUESTS_ERROR";
export const PHOTOREQUEST_RECOVERED = "PHOTOREQUEST_RECOVERED";
export const PHOTOREQUEST_ERROR = "PHOTOREQUEST_ERROR";
export const PHOTOREQUEST_SWITCH_STATE = "PHOTOREQUEST_SWITCH_STATE";
export const PHOTOREQUEST_SWITCH_STATE_ERROR =
  "PHOTOREQUEST_SWITCH_STATE_ERROR";
export const CONTACT_SUCCESS = "CONTACT_SUCCESS";
export const CONTACT_ERROR = "CONTACT_ERROR";
export const CONTACTMESSAGES_RECOVERED = "CONTACTMESSAGES_RECOVERED";
export const CONTACTMESSAGES_ERROR = "CONTACTMESSAGES_ERROR";
export const CONTACTMESSAGE_SWITCH_STATE = "CONTACTMESSAGE_SWITCH_STATE";
export const CONTACTMESSAGE_SWITCH_STATE_ERROR =
  "CONTACTMESSAGE_SWITCH_STATE_ERROR";
export const VALIDATE_RECAPTCHA = "VALIDATE_RECAPTCHA";
export const VALIDATE_RECAPTCHA_ERROR = "VALIDATE_RECAPTCHA_ERROR";
export const RESET_RECAPTCHA = "RESET_RECAPTCHA";
