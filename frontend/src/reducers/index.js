import alert from './alert';
import auth from "./auth";
import curador from "./curador"
import home from "./home";
import photoDetails from './photodetails';
import misc from './misc';
import search from './search';
import upload from './upload';
import user from './user';
import metadata from './metadata';
import landing from './landing';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  alert: alert,
  auth: auth,
  curador: curador,
  home: home,
  photoDetails: photoDetails,
  misc: misc,
  search: search,
  upload: upload,
  user: user,
  metadata: metadata,
  landing: landing,
})

export default rootReducer;
