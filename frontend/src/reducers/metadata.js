import {
  CREATING_METADATA,
  CREATED_METADATA_ERROR,
  CREATED_METADATA,
  RESET_METADATA_STORE,
  RECOVERED_TAGS,
  EMPTY_TAGS,
  RECOVERED_IPTCS,
  EMPTY_IPTCS,
} from "../actions/types";

const initialState = {
  newIds: [],
  failedCreations: [],
  creating: false,
  nbMetaCreating: 0,
  all_tags: [],
  all_iptcs: [],
};

export default function metadata(state = initialState, action) {
  const { type, data } = action;

  const total = state.newIds.length + state.failedCreations.length;

  switch (type) {
    case CREATING_METADATA:
      return {
        ...initialState,
        creating: true,
        nbMetaCreating: data,
      };
    case CREATED_METADATA:
      return {
        ...state,
        newIds: [...state.newIds, data],
        creating: !(state.nbMetaCreating === total + 1),
      };
    case CREATED_METADATA_ERROR:
      return {
        ...state,
        failedCreations: [...state.failedCreations, data],
        creating: !(state.nbMetaCreating === total + 1),
      };
    case RESET_METADATA_STORE:
      return { ...initialState };
    case RECOVERED_TAGS:
      return { ...state, all_tags: action.data };
    case EMPTY_TAGS:
      return { ...state, all_tags: [] };
    case RECOVERED_IPTCS:
      return { ...state, all_iptcs: action.data };
    case EMPTY_IPTCS:
      return { ...state, all_iptcs: [] };
    default:
      return state;
  }
}
