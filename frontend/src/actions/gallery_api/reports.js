import {
  RECOVERED_REPORT,
  EMPTY_REPORTS,
  REPORT_COMPLETED,
  REPORT_FAILED,
  REPORT_NEW,
  REPORT_SWITCH_STATE,
  REPORT_SWITCH_STATE_ERROR,
} from "../types";
import {setAlert} from '../site_misc'

export const getReportes = () => {
  //GET REPORTES Y DENUNCIAS
  return (dispatch, getState) => {
    let headers = {
      Authorization: "Token " + getState().user.token,
      "Content-Type": "application/json",
    };

    return fetch("/api/reports/?sort=desc-created_at", {
      method: "GET",
      headers: headers,
    }).then((res) => {
      if (res.status === 200) {
        return res.json().then((data) => {
          dispatch({ type: RECOVERED_REPORT, data: data.results });
        });
      } else {
        dispatch({ type: EMPTY_REPORTS, data: res.data });
        throw res.data;
      }
    });
  };
};

export const updateReport = (report) => (dispatch, getState) => {
  let headers = {
    "Content-Type": "application/json",
    Authorization: "Token " + getState().user.token,
  };
  return fetch(`/api/reports/${report.id}/`, {
    method: "PUT",
    headers,
    body: JSON.stringify(report),
  }).then((response) => {
    const r = response;
    if (r.status === 200) {
      return r.json().then((data) => {
        dispatch({ type: REPORT_SWITCH_STATE, data: data });
      });
    } else {
      dispatch(setAlert("Hubo un error al actualizar el reporte", "warning"));
      dispatch({ type: REPORT_SWITCH_STATE_ERROR, data: r.data });
      throw r.data;
    }
  });
};

export const censureContent = (report) => (dispatch, getState) => {
  let headers = {
    "Content-Type": "application/json",
    Authorization: "Token " + getState().user.token,
  };
  return fetch(`/api/actions/censure`, {
    method: "POST",
    headers,
    body: JSON.stringify(report),
  }).then((response) => {
    const r = response;
    if (r.status === 200) {
      return r.json().then((data) => {
        dispatch({ type: REPORT_SWITCH_STATE, data: data });
      });
    } else {
      dispatch(setAlert("Hubo un error al censurar el contenido solicitado.", "warning"));
      dispatch({ type: REPORT_SWITCH_STATE_ERROR, data: r.data });
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
