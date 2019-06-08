export const home = () => {return (dispatch,getState) => {
    let headers = {"Content-Type": "application/json"};

    return fetch('/gallery/photo/',{method: 'GET', headers: headers})
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

/*
fetch('http://localhost:8000/gallery/photo/',{method: 'GET'})
  .then(function(response) {
    return response.json();
  })*/