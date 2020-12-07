import {
  RECOVERED_REPORT,
  EMPTY_REPORTS,
  REPORT_COMPLETED,
  REPORT_FAILED,
  REPORT_NEW,
  REPORT_SWITCH_STATE,
  REPORT_SWITCH_STATE_ERROR,
} from "../../actions/types";

const initialState = {
  reports: [],
  error: "",
  reportUpdate: {},
  photoReportSent: false,
  reportComplete: false,
};

export default function curador(state = initialState, action) {
  switch (action.type) {
    case RECOVERED_REPORT:
      return { ...state, reports: action.data };
    case EMPTY_REPORTS:
      return { ...state, reports: [] };
    case REPORT_SWITCH_STATE:
      return { ...state, reportUpdate: action.data };
    case REPORT_SWITCH_STATE_ERROR:
      return { ...state, reportUpdate: {} };
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


export const selectReportReport = (state) => state.reports.reports;

export const selectReportUpdate = (state) => state.reports.reportUpdate;

export const selectReportPhotoReportSent = (state) => state.reports.photoReportSent;

export const selectReportComplete = (state) => state.reports.reportComplete;
