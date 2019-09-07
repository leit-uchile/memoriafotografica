export const createMetadata = (formData) => {return (dispatch, getState) => {
  let headers = {'Content-Type' : 'application/json'};

  return fetch(`/api/metadata/${id}`, {method: 'GET', headers: headers}).then(
  function(response){
      const r = response;
      if(r.status === 200){
          return r.json().then(data => {
              dispatch({type: 'RECOVERED_PHOTO_DETAILS', data: data})
          })
      }else{
          dispatch({type: 'ERROR_ON_FETCH', data: r.data})
          throw r.data;
      }
  })
}}