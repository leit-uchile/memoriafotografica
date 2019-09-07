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


export const getCategories = () => { return (dispatch, getState) => {
  let headers = {"Content-Type": "application/json"};

  return fetch('/api/categories/',{method: 'GET', headers: headers})
    .then(function(response) {
      console.log(response)
      const r = response
      if(r.status === 200){
        return r.json().then(data => {
          dispatch({type: 'RECOVERED_CATS', data: data })
        })
      }else{
        dispatch({type: 'EMPTY_CATS', data: r.data })
        throw r.data
      }
    })
}}

export const createCategory = (token,data) => { return (dispatch, getState) => {
  let headers = {"Authorization" : "Token "+token,"Content-Type": "application/json"}
  let sent_data = JSON.stringify({title:data})
  console.log(sent_data)
  //dispatch({type: 'CREATING', data: "" })
  fetch('/api/categories/',{method: 'POST', headers: headers, body: sent_data})
    .then(function(response) {
      const r = response
      console.log(r)
      if(r.status === 200){
        return r.json().then(data => {
          dispatch({type: 'CREATED_CAT', data: data })
        })
      }else{
        dispatch({type: 'ERROR_CREATING', data: r.data })
        throw r.data
      }
    })


}}
export const editCategory = () => {

}

export const deleteCategories = () => { return (dispatch, getState) => {

}
  //hacer llamado a la API, si OK, entonces borrar cat de las props usando el reducer apropiado
}

//va a faltar poner aca el action de getCategories porque no se va a poder llamar al del home.
