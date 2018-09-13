import auth from "./auth";
import home from "./home";
import {combineReducers} from 'redux';

/*const initialState = {
    imgs : []
};

const rootReducer = (state = initialState, action) => state;
*/
const rootReducer = combineReducers({
  auth: auth,
  home: home
})

export default rootReducer;
