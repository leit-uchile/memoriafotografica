import auth from "./auth";
import notes from './notes';

import {combineReducers} from 'redux';

/*const initialState = {
    imgs : []
};

const rootReducer = (state = initialState, action) => state;
*/
const rootReducer = combineReducers({
  notes: notes,
  auth: auth
})

export default rootReducer;