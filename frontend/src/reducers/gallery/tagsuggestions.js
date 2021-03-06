import {
  CREATED_TAGSUGGESTION,
  CREATING_TAGSUGGESTION,
  CREATED_TAGSUGGESTION_ERROR,
  RECOVERED_TAGSUGGESTION,
  RECOVERED_TAGSUGGESTION_ERROR,
  EMPTY_TAGSUGGESTION,
  LOADING_TAGSUGGESTION,
  APPROVING_TAGSUGGESTION,
  APPROVED_TAGSUGGESTION,
  APPROVED_TAGSUGGESTION_ERROR,
} from "../../actions/types";

const initialState = {
  newIds: [],
  loading: false,
  creating: false,
  failed: false,
  tags_suggestions: [],
  approving: false,
  approved: false,
  approved_fail_ids: [],
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

    case APPROVING_TAGSUGGESTION:
      return {
        ...state,
        approving: true,
        approved: false,
        approved_fail_ids: [],
      };
    case APPROVED_TAGSUGGESTION:
      return {
        ...state,
        approving: false,
        approved: true,
        approved_fail_ids: [],
      };
    case APPROVED_TAGSUGGESTION_ERROR:
      return {
        ...state,
        approving: false,
        approved: false,
        approved_fail_ids: data.failed,
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

export const selectTagSuggestionsApproving = (state) =>
  state.tagsuggestions.approving;

export const selectTagSuggestionsApproved = (state) =>
  state.tagsuggestions.approved;

export const selectTagSuggestionsApproveFailIds = (state) =>
  state.tagsuggestions.approved_fail_ids;