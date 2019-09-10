import auth from "./auth";
import curador from "./curador"
import home from "./home";
import photoDetails from './photodetails';
import misc from './misc';
import search from './search';
import upload from './upload';
import user from './user';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  auth: auth,
  curador: curador,
  home: home,
  photoDetails: photoDetails,
  misc: misc,
  search: search,
  upload: upload,
  user: user,
})

export default rootReducer;
