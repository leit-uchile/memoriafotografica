import auth from "./auth";
import home from "./home";
import photoDetails from './photodetails';
import misc from './misc';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  auth: auth,
  home: home,
  photoDetails: photoDetails,
  misc: misc

})

export default rootReducer;
