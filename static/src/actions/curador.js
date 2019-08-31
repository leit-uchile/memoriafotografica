export const getReportes = () => { //GET REPORTES Y DENUNCIAS
  return (dispatch, getState) => {
    let headers = {"Content-Type": "application/json"};

    return fetch('/gallery/reports/', {method: 'GET', headers: headers})
      .then(res => {
        if(res.status === 200){
          return res.json().then(data => {
            dispatch({type: 'RECOVERED_REPORT', data: data})
          })
        } else {
          dispatch({type: 'EMPTY_REPORTS', data: res.data})
          throw res.data
        }
      })
  }
}
