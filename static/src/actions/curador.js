export const getReportes = () => { //GET REPORTES Y DENUNCIAS
  return (dispatch, getState) => {
    let headers = {"Content-Type": "application/json"};

    return fetch('/api/reports/', {method: 'GET', headers: headers})
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

export const deleteCategories = (auth, catArray) => { return (dispatch, getState) => {
    console.log(catArray.length)
    const to_send = catArray.length;
    var completed_ok = 0;
    var completed_err = 0;
    dispatch({type: 'LOADING', data: ""})
    catArray.forEach((e) => {
      let headers = {"Authorization" : "Token "+auth,"Content-Type": "application/json"}
      fetch('/api/categories/'+e,{method: 'DELETE', headers: headers}).then(response => {
        if(response.status == 204){
          ++completed_ok;
        } else {
          ++completed_err;
        }
        if (completed_err+completed_ok == to_send){
          console.log("done")
          console.log("errors: "+completed_err)
          console.log("ok: "+completed_ok)
          dispatch({type:'COMPLETED', data:""})
          dispatch({type:'REFRESH', data:""})
          dispatch({type:'DUMMY', data:""})
        }
      })
    })
  }}


export const getPhotos = (auth) => { return (dispatch, getState) => {
    let headers = {"Content-Type": "application/json", "Authorization": "Token "+auth};

    return fetch('/api/photos/',{method: 'GET', headers: headers})
      .then(function(response) {
        console.log(response)
        const r = response
        if(r.status === 200){
          return r.json().then(data => {
            dispatch({type: 'RECOVERED_PHOTOS', data: data })
          })
        }else{
          dispatch({type: 'EMPTY_PHOTOS', data: r.data })
          throw r.data
        }
      })
  }}

export const switchPhotoApproval = (auth, photoID, curr_value) => { return (dispatch, getState) => {
    let headers = {"Content-Type": "application/json", "Authorization": "Token "+auth};
    let sent_data = JSON.stringify({approved:!curr_value})
    return fetch('/api/photos/'+photoID+'/',{method: 'PUT', headers: headers, body:sent_data})
      .then(function(response) {
        console.log(response)
        const r = response
        if(r.status === 200){
          return r.json().then(data => {
            dispatch({type: 'SWITCHED_PHOTO', data: data })
          })
        }else{
          dispatch({type: 'ERROR', data: r.data })
          throw r.data
        }
      })
  }}
