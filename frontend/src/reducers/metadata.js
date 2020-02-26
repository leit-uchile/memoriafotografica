import {
  CREATING_METADATA,
  CREATED_METADATA_ERROR,
  CREATED_METADATA,
  RESET_METADATA_STORE
} from "../actions/types";

const initialState = {
  newIds: [],
  failedCreations: [],
  creating: false,
  nbMetaCreating: 0
};

export default function metadata(state = initialState, action) {
  const { type, data } = action;

  const total = state.newIds.length + state.failedCreations.length;

  switch (type) {
    case CREATING_METADATA:
      return {
        ...initialState,
        creating: true,
        nbMetaCreating: data
      };
    case CREATED_METADATA:
      return {
        ...state,
        newIds: [...state.newIds, data],
        creating: !(state.nbMetaCreating === total + 1)
      };
    case CREATED_METADATA_ERROR:
      return {
        ...state,
        failedCreations: [...state.failedCreations, data],
        creating: !(state.nbMetaCreating === total + 1)
      };
    case RESET_METADATA_STORE:
      return { ...initialState };
    default:
      return state;
  }
}
