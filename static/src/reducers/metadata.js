import {
  CREATING_METADATA,
  CREATED_METADATA_ERROR,
  CREATED_METADATA
} from "../actions/types";

const initialState = {
  newIds: [],
  failedCreations: []
};

export default function metadata(state = initialState, action) {
  const { type, data } = action;
  switch (type) {
    case CREATING_METADATA:
      return { ...initialState };
    case CREATED_METADATA:
      return {
        ...state,
        newIds: [...state.newIds, ...data]
      };
    case CREATED_METADATA_ERROR:
      return {
        ...state,
        failedCreations: [...state.failedCreations, ...data]
      };
    default:
      return state;
  }
}
