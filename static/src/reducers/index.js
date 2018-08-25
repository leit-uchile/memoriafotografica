import auth from "./auth";

import {combineReducers} from 'redux';

/*const initialState = {
    imgs : []
};

const rootReducer = (state = initialState, action) => state;
*/
const rootReducer = combineReducers({
  auth: auth
})

export default rootReducer;