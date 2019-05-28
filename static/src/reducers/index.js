import auth from "./auth";
import home from "./home";
import photoDetails from './photodetails';
import misc from './misc';
import search from './search';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  auth: auth,
  home: home,
  photoDetails: photoDetails,
  misc: misc,
  search: search
})

export default rootReducer;
