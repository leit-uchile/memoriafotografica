import auth from "./auth";
import home from "./home";
import photoDetails from './photodetails';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  auth: auth,
  home: home,
  photoDetails: photoDetails
})

export default rootReducer;
