import {
  CREATED_TAGSUGGESTION,
  CREATING_TAGSUGGESTION,
  CREATED_TAGSUGGESTION_ERROR
} from "../../actions/types";


const initialState = {
  newIds: [],
  creating: false,
  failed: false,
};


export default function tagsuggestions(state = initialState, action) {
  const { type, data } = action;

  switch (type) {
    case CREATING_TAGSUGGESTION:
      return {
        newIds: [],
        creating: true,
        failed: false,
      };
    case CREATED_TAGSUGGESTION:
      return {
        failed: false,
        creating: false,
        newIds: data,
      };
    case CREATED_TAGSUGGESTION_ERROR:
      return {
        ...state,
        failed: true,
        creating: false
        // failedCreations: [...state.failedCreations, data.failed],
        // newIds: [...state.newIds, data.newIds],
      };
    default:
      return state;
  }
}

export const selectTagSuggestionsCreating = (state) => state.tagsuggestions.creating;

export const selectTagSuggestionsFailed = (state) => state.tagsuggestions.failed;

export const selectTagSuggestionsNewIds = (state) => state.tagsuggestions.newIds;
