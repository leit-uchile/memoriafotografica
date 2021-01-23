import {
  CREATED_TAGSUGGESTION,
  CREATING_TAGSUGGESTION,
  CREATED_TAGSUGGESTION_ERROR,
  RECOVERED_TAGSUGGESTION,
  RECOVERED_TAGSUGGESTION_ERROR,
  EMPTY_TAGSUGGESTION,
  LOADING_TAGSUGGESTION,
} from "../../actions/types";

const initialState = {
  newIds: [],
  loading: false,
  creating: false,
  failed: false,
  tags_suggestions: [],
};

export default function tagsuggestions(state = initialState, action) {
  const { type, data } = action;

  switch (type) {
    case CREATING_TAGSUGGESTION:
      return {
        ...state,
        newIds: [],
        creating: true,
        failed: false,
      };
    case CREATED_TAGSUGGESTION:
      return {
        ...state,
        failed: false,
        creating: false,
        newIds: data,
      };
    case CREATED_TAGSUGGESTION_ERROR:
      return {
        ...state,
        failed: true,
        creating: false,
        newId: [],
      };

    case LOADING_TAGSUGGESTION:
      return {
        ...state,
        loading: true,
        tags_suggestions: [],
      };

    case RECOVERED_TAGSUGGESTION:
      return {
        ...state,
        loading: false,
        failed: false,
        tags_suggestions: data,
      };

    case RECOVERED_TAGSUGGESTION_ERROR:
      return {
        ...state,
        loading: false,
        failed: true,
        tags_suggestions: data,
      };

    case EMPTY_TAGSUGGESTION:
      return {
        ...state,
        loading: false,
        failed: false,
        tags_suggestions: [],
      };
    default:
      return state;
  }
}

export const selectTagSuggestionsCreating = (state) =>
  state.tagsuggestions.creating;

export const selectTagSuggestionsLoading = (state) =>
  state.tagsuggestions.loading;

export const selectTagSuggestionsFailed = (state) =>
  state.tagsuggestions.failed;

export const selectTagSuggestionsNewIds = (state) =>
  state.tagsuggestions.newIds;

export const selectTagSuggestionsRecovered = (state) =>
  state.tagsuggestions.tags_suggestions;
