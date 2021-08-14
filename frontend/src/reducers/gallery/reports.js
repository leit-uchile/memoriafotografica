import {
  REPORTS_LOADING,
  REPORTS_LOADED,
  EMPTY_REPORTS,
  REPORT_UPDATING,
  REPORT_CENSORING,
  REPORT_DISCARDING,
  REPORT_UPDATED,
  REPORT_UPDATED_ERROR,
  REPORT_NEW,
  REPORT_COMPLETED,
  REPORT_FAILED
} from "../../actions/types";

const initialState = {
  reports: { results: [], count: 0, },
  error: "",
  photoReportSent: false,
  reportComplete: false,
  reportsStatus: 'idle',
  itemStatus: 'idle',
  reportUpdate: {},
};

export default function curador(state = initialState, action) {
  switch (action.type) {
    case REPORTS_LOADING:
      return { ...state, reportsStatus: 'loading' };
    case REPORTS_LOADED:
      return { ...state, reportsStatus: 'success', reports: action.data };
    case EMPTY_REPORTS:
      return { ...state, reportsStatus: 'failure', reports: { results: [], count: 0, }, };
    case REPORT_UPDATING:
      return { ...state, itemStatus: 'loading' };
    case REPORT_CENSORING:
      return { ...state, itemStatus: 'loading' };
    case REPORT_DISCARDING:
      return { ...state, itemStatus: 'loading' };
    case REPORT_UPDATED:
      return { ...state, itemStatus: 'success', reportUpdate: action.data };
    case REPORT_UPDATED_ERROR:
      return { ...state, itemStatus: 'failure', reportUpdate: {} };
    case REPORT_NEW:
      return { ...state, photoReportSent: false };
    case REPORT_COMPLETED:
      return { ...state, photoReportSent: true, reportComplete: true };
    case REPORT_FAILED:
      return { ...state, photoReportSent: true, reportComplete: false };
    default:
      return state;
  }
}


export const selectReportReports = (state) => state.reports.reports;

export const selectReportStatus = (state) => state.reports.reportsStatus;

export const selectReportItemStatus = (state) => state.reports.itemStatus;

export const selectReportReportUpdate = (state) => state.reports.reportUpdate;

export const selectReportPhotoReportSent = (state) => state.reports.photoReportSent;

export const selectReportComplete = (state) => state.reports.reportComplete;
