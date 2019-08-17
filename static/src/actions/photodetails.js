export const getPhoto = (id) => {return (dispatch, getState) => {
    let headers = {'Content-Type' : 'application/json'};

    return fetch(`/gallery/photo/${id}`, {method: 'GET', headers: headers}).then(
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

export const getComments = (id, auth) => {return (dispatch, getState) => {
    let headers = {
        'Authorization' : 'Token '+ auth,
        'Content-Type' : 'application/json'
    };

    return fetch(`/api/photos/${id}/comments/`, {method: 'GET', headers: headers}).then(
    function(response){
        const r = response;
        if(r.status === 200){
            return r.json().then(data => {
                dispatch({type: 'RECOVERED_PHOTO_COMMENTS', data: data})
            })
        }else{
            dispatch({type: 'ERROR_ON_COMMENT_FETCH', data: r.data})
            throw r.data;
        }
    })
}}

export const putComment = (id, comment, auth) => {return (dispatch, getState) => {
    let headers = {
        'Authorization' : 'Token '+ auth,
        'Content-Type' : 'application/json',
    };

    let jsonthing = JSON.stringify({id: id, content: comment})

    return fetch(`/api/photos/${id}/comments/`, 
        {method: 'POST', headers: headers, body: jsonthing}).then(
    function(response){
        const r = response;
        if(r.status === 201){
            return r.json().then(data => {
                dispatch({type: 'CREATED_COMMENT', data: data})
            })
        }else{
            dispatch({type: 'ERROR_ON_NEW_COMMENT', data: r.data})
            throw r.data;
        }
    })
}}

export const getMetadataNames = (ids) => {return (dispatch, getState) => {
    return fetch(`/api/metadata/?ids=${ids.toString()}`).then(
        function(response){
            const r = response;
            if(r.status === 200){
                return r.json().then(data => {
                    dispatch({type: 'LOADED_CUSTOM_METADATA', data: data})
                });
            }else{
                dispatch({type: "ERROR_ON_METADATA_FETCH", data: r.data})
            }
        }
    )
}}