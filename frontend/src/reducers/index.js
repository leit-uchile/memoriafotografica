import albumcollection from './albumcollection';
import alert from './alert';
import auth from "./auth";
import curador from "./curador"
import home from "./home";
import landing from './landing';
import metadata from './metadata';
import misc from './misc';
import photoDetails from './photodetails';
import search from './search';
import upload from './upload';
import user from './user';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  albumcollection: albumcollection,
  alert: alert,
  auth: auth,
  curador: curador,
  home: home,
  landing: landing,
  metadata: metadata,
  misc: misc,
  photoDetails: photoDetails,
  search: search,
  upload: upload,
  user: user,
})

export default rootReducer;
