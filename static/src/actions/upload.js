export const uploadImage = (name,description,image) => {
    return (dispatch, getState) => {
        let header = {"Content-Type": "application/json"};

        // In case we should use base64
        /*
        var reader = new FileReader();
        reader.onload = e => {
            var img64 = e.target.result;
            console.log(img64);
        }
        reader.readAsDataURL(image);
        */
        var formData = new FormData();
        formData.append("title",name);
        formData.append("description",description);
        formData.append("image",image);
       
        fetch("/api/gallery/upload/", {
            method: 'POST',
            headers: header,
            body: formData
        });
    }
}

export const putInfo = (uploadInfo) => {
    return (dispatch, getState) => {
        return dispatch({type: 'BUFFER_INFO', data: uploadInfo})
    }
}

// TODO: complete this quick
export const uploadImages = (photos, auth) => { return (dispatch, getState) => {
    
    let header = {
        'Authorization' : 'Token '+ auth
    };

    // Only upload first image
    const current = photos.photosList[0]

    const permissionBack = [
        'CC BY',
        'CC BY-SA',
        'CC BY-ND',
        'CC BY-NC',
        'CC BY-NC-SA',
        'CC BY-NC-ND'
    ]
    
    var formData = new FormData();
    formData.append("title",current.meta.title); // No title yet
    formData.append("description", current.meta.description); // 
    formData.append("image", current.photo); //
    formData.append("permission", current.meta.cc[0] ? permissionBack[0] : permissionBack[0]) // Send first for now harcoded
   
    return fetch("/api/photos/", {
        method: 'POST',
        headers: header,
        body: formData
    }).then(function(response){
        const r = response
        if(r.status === 201){
            return dispatch({type: 'UPLOADED_PHOTO', data: null})
        }else{
            dispatch({type: 'ERROR_UPLOADING', data: r.data})
            throw r.data
        }
    })
}}

export const setUploading = () => { return (dispatch, getState) => {
    return dispatch({type: 'UPLOADING', data: null})
}}
    