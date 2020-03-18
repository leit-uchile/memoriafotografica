import { PUT_META, REMOVE_META } from "../actions/types";

const initialState = {
  metaIDs: []
};

export default function search(state = initialState, action) {
  var newMetaIDs;
  switch (action.type) {
    case PUT_META:
      newMetaIDs = state.metaIDs.filter(el => el.metaID !== action.data.metaID);
      return { ...state, metaIDs: [...newMetaIDs, action.data] };
    case REMOVE_META:
      newMetaIDs = state.metaIDs.filter(el => el.metaID !== action.data.metaID);
      return { ...state, metaIDs: [...newMetaIDs] };
    default:
      return state;
  }
}
