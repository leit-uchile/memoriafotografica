import {
  CREATING_METADATA,
  CREATED_METADATA_ERROR,
  CREATED_METADATA,
  RESET_METADATA_STORE,
  RECOVERED_TAGS,
  EMPTY_TAGS,
  RECOVERED_IPTCS,
  EMPTY_IPTCS,
  RECOVERED_METADATA_BATCH,
  EMPTY_METADATA_BATCH,
  UPDATED_METADATA,
  UPDATED_METADATA_ERROR,
  RECOVERED_CURADOR_TAGS,
  EMPTY_CURADOR_TAGS,
} from "../actions/types";

const initialState = {
  newIds: [],
  failedCreations: [],
  creating: false,
  nbMetaCreating: 0,
  all_tags: [],
  all_iptcs: [],
  batch: {count: 0, results: []},
  update_status: "",
  // Used in curador
  general_tags: {count: 0, results: []}
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
    case RECOVERED_METADATA_BATCH:
      return { ...state, batch: action.data };
    case EMPTY_METADATA_BATCH:
      return { ...state, batch: {count: 0, results: []} };
    case UPDATED_METADATA:
      return {...state, update_status: "success "+action.data}
    case UPDATED_METADATA_ERROR:
      return {...state, update_status: "failed "+action.data}
    case RECOVERED_CURADOR_TAGS:
      return {...state, general_tags: action.data}
    case EMPTY_CURADOR_TAGS:
      return {...state, general_tags: {count: 0, results: []}}
    default:
      return state;
  }
}
