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
  DELETED_METADATA_ERROR,
  DELETED_METADATA,
  METADATA_RESET_NB_OPS,
  METADATA_MERGE,
  METADATA_MERGE_ERROR,
} from "../actions/types";

const initialState = {
  newIds: [],
  failedCreations: [],
  creating: false,
  nbMetaCreating: 0,
  all_tags: [],
  all_iptcs: [],
  batch: { count: 0, results: [] },
  update_status: "",
  // Used in curador
  general_tags: { count: 0, results: [] },
  nbOperations: 0,
  opsCompleted: 0,
  opsErrors: [],
  metaUpdate: {},
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
        newIds: [...state.newIds, ...data],
        creating: !(state.nbMetaCreating === total + data.length),
      };
    case CREATED_METADATA_ERROR:
      return {
        ...state,
        failedCreations: [...state.failedCreations, ...data],
        creating: !(state.nbMetaCreating === total + data.length),
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
      return { ...state, batch: { count: 0, results: [] } };
    case UPDATED_METADATA:
      return {
        ...state,
        update_status: "success " + action.data.id,
        opsCompleted: state.opsCompleted + 1,
        metaUpdate: state.nbOperations === state.opsCompleted + 1 ? action.data : state.metaUpdate,
      };
    case UPDATED_METADATA_ERROR:
      return {
        ...state,
        update_status: "failed " + action.data.id,
        opsErrors: [...state.opsErrors, action.data],
      };
    case RECOVERED_CURADOR_TAGS:
      return { ...state, general_tags: action.data };
    case EMPTY_CURADOR_TAGS:
      return { ...state, general_tags: { count: 0, results: [] } };
    case METADATA_RESET_NB_OPS:
      return {
        ...state,
        nbOperations: action.data,
        opsCompleted: 0,
        opsErrors: [],
      };
    case DELETED_METADATA:
      return {
        ...state,
        opsCompleted: state.opsCompleted + 1,
        metaUpdate: state.nbOperations === state.opsCompleted + 1 ? action.data : state.metaUpdate,
      };
    case DELETED_METADATA_ERROR:
      return { ...state, opsErrors: [...state.opsErrors, action.data] };
    case METADATA_MERGE:
      return {
        ...state,
        opsCompleted: state.opsCompleted + 1,
        metaUpdate: state.nbOperations === state.opsCompleted + 1 ? action.data : state.metaUpdate,
      };
    case METADATA_MERGE_ERROR:
      return { ...state, opsErrors: [...state.opsErrors, action.data] };
    default:
      return state;
  }
}

export const selectMetaDataGeneralTags = (state) => state.metadata.general_tags;

export const selectMetaDataAllIptcs = (state) => state.metadata.all_iptcs;

export const selectMetaDataBatch = (state) => state.metadata.batch;

export const selectMetaDataOpsCompleted = (state) => state.metadata.opsCompleted;

export const selectMetaDataOpsErrors = (state) => state.metadata.opsErrors;

export const selectMetaDataUpdate = (state) => state.metadata.metaUpdate;

export const selectMetaDataGeneralTagsResult = (state) => state.metadata.general_tags.results;

export const selectMetaData = (state) => state.metadata;

export const selectMetaDataAllTags = (state) => state.metadata.all_tags;

export const selectMetaDataCreating = (state) => state.metadata.creating;

export const selectMetaDataNewIds = (state) => state.metadata.newIds;