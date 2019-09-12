export const home = () => {return (dispatch,getState) => {
    let headers = {"Content-Type": "application/json"};

    return fetch('/api/photos/',{method: 'GET', headers: headers})
    .then(function(response) {
      const r = response
      if(r.status === 200){
        return r.json().then(data => {
          dispatch({type: 'RECOVERED_PHOTO', data: data })
        })
      }else{
        dispatch({type: 'EMPTY', data: r.data })
        throw r.data
      }
    })
}}

export const tags = () => { return (dispatch, getState) => {
  let headers = {"Content-Type": "application/json"};

  return fetch('/api/metadata/',{method: 'GET', headers: headers})
    .then(function(response) {
      const r = response
      if(r.status === 200){
        return r.json().then(data => {
          dispatch({type: 'RECOVERED_TAGS', data: data })
        })
      }else{
        dispatch({type: 'EMPTY_TAGS', data: r.data })
        throw r.data
      }
    })
}}

export const categories = () => { return (dispatch, getState) => {
  let headers = {"Content-Type": "application/json"};

  return fetch('/api/categories/',{method: 'GET', headers: headers})
    .then(function(response) {
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

export const iptcs = () => { return (dispatch, getState) => {
  let headers = {"Content-Type": "application/json"};

  return fetch('/api/iptc-keyword/',{method: 'GET', headers: headers})
    .then(function(response) {
      const r = response
      if(r.status === 200){
        return r.json().then(data => {
          dispatch({type: 'RECOVERED_IPTCS', data: data })
        })
      }else{
        dispatch({type: 'EMPTY_IPTCS', data: r.data })
        throw r.data
      }
    })
}}


export const detail = (image) => {return (dispatch,getState) =>
{
    dispatch({type: "DETAIL", data: image})
}}

export const sortByField = (field,order,auth) => { return (dispatch, getState) => {

  let header = {
    Authorization: "Token " + auth
  };

  if(order !== 'asc' && order !== 'desc'){
    return dispatch({type: 'EMPTY', data: 'wrong order parameter' })
  }

  fetch(`/api/photos/?sort=${field}-${order}`, {method: 'GET', headers: header}).then( response => {
      const r = response;
      if(r.status === 200){
        return r.json().then(data => {
          dispatch({type: "RECOVERED_PHOTO", data: data})
        })
      }else{
        dispatch({type: 'EMPTY', data: r.data })
        throw r.data
      }
    })
  }
}

export const sortByUpload = (order,auth) => { return (dispatch, getState) => {

  let header = {
    Authorization: "Token " + auth
  };

  if(order !== 'asc' && order !== 'desc'){
    return dispatch({type: 'EMPTY', data: 'wrong order parameter' })
  }

  fetch(`/api/photos/?sort=created_at-${order}`, {method: 'GET', headers: header}).then( response => {
      const r = response;
      if(r.status === 200){
        return r.json().then(data => {
          dispatch({type: "RECOVERED_PHOTO", data: data})
        })
      }else{
        dispatch({type: 'EMPTY', data: r.data })
        throw r.data
      }
    })
  }
}
