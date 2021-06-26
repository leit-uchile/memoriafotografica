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
} from "../types";
import { setAlert } from '../site_misc'


export const getReportes = (query, page, page_size, extra) => (
  dispatch,
  getState
) => {
  let headers = {
    Authorization: "Token " + getState().user.token,
    "Content-Type": "application/json",
  };
  dispatch({ type: REPORTS_LOADING})
  return fetch(`/api/reports/?search=${query}&page=${page}&page_size=${page_size}${extra}`, {
    method: "GET",
    headers: headers,
  }).then((res) => {
    if (res.status === 200) {
      return res.json().then((data) => {
        dispatch({ type: REPORTS_LOADED, data: data });
      });
    } else {
      dispatch({ type: EMPTY_REPORTS, data: res.data });
      throw res.data;
    }
  });
};

export const updateReport = (report) => (dispatch, getState) => {
  let headers = {
    "Content-Type": "application/json",
    Authorization: "Token " + getState().user.token,
  };
  dispatch({ type: REPORT_DISCARDING})
  return fetch(`/api/reports/${report.id}/`, {
    method: "PUT",
    headers: headers,
    body: JSON.stringify(report),
  }).then((response) => {
    const r = response;
    if (r.status === 200) {
      return r.json().then((data) => {
        dispatch({ type: REPORT_UPDATED, data: data });
        dispatch(setAlert("Reporte descartado exitosamente", "success"));
      });
    } else {
      dispatch({ type: REPORT_UPDATED_ERROR, data: r.data });
      dispatch(setAlert("Error descartando reporte. Intente nuevamente", "warning"));
      throw r.data;
    }
  });
};

export const censureContent = (report) => (dispatch, getState) => {
  let headers = {
    "Content-Type": "application/json",
    Authorization: "Token " + getState().user.token,
  };
  dispatch({ type: REPORT_CENSORING})
  return fetch(`/api/actions/censure/`, {
    method: "POST",
    headers,
    body: JSON.stringify(report),
  }).then((response) => {
    const r = response;
    if (r.status === 200) {
      return r.json().then((data) => {
        dispatch({ type: REPORT_UPDATED, data: data });
        dispatch(setAlert("Contenido censurado exitosamente", "success"));
      });
    } else {
      dispatch({ type: REPORT_UPDATED_ERROR, data: r.data });
      dispatch(setAlert("Error censurando contenido. Intente nuevamente", "warning"));
      throw r.data;
    }
  });
};

export const updateContent = (report, content) => (dispatch, getState) => {
  let headers = {
    "Content-Type": "application/json",
    Authorization: "Token " + getState().user.token,
  };
  dispatch({ type: REPORT_UPDATING})
  return fetch(`/api/actions/reportEditContent/`, {
    method: "POST",
    headers,
    body: JSON.stringify({ report: report, newContent: content }),
  }).then((response) => {
    const r = response;
    if (r.status === 200) {
      return r.json().then((data) => {
        dispatch({ type: REPORT_UPDATED, data: data });
        dispatch(setAlert("Contenido actualizado exitosamente", "success"));
      });
    } else {
      dispatch({ type: REPORT_UPDATED_ERROR, data: r.data });
      dispatch(setAlert("Error actualizando contenido. Intente nuevamente", "warning"));
      throw r.data;
    }
  });
};

export const reportPhoto = (data) => (dispatch, getState) => {
  let headers = {
    Authorization: "Token " + getState().user.token,
    "Content-Type": "application/json",
  };

  let jsonthing = JSON.stringify(data);
  dispatch({ type: REPORT_NEW, data: null });

  return fetch("/api/reports/", {
    method: "POST",
    headers: headers,
    body: jsonthing,
  }).then(function (response) {
    const r = response;
    if (r.status === 201) {
      return r.json().then((data) => {
        dispatch({ type: REPORT_COMPLETED, data: data });
      });
    } else {
      dispatch({ type: REPORT_FAILED, data: r.data });
      throw r.data;
    }
  });
};

export const reportPhotoReset = () => (dispatch) => {
  dispatch({ type: REPORT_NEW, data: null });
};
