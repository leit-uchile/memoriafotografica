export const uploadImage = (name,description,image) => {
    return (dispatch, getState) => {
        let header = {"Content-Type": "application/json"};

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

// When uploading each photo will reduce to success or error.
// In case of error the payload will contain the id for 
// user feedback (and posibly relaunch)
export const uploadImages = (photos, auth) => { return (dispatch, getState) => {

    let header = {
        'Authorization' : 'Token '+ auth
    };

    var currentTime = new Date();
    currentTime = `${currentTime.getDay()}-${currentTime.getMonth()}-${currentTime.getFullYear()}`

    photos.photosList.map( (photo,key) => {
        let formData = new FormData();
        // If no title available create one for our date
        formData.append("title", photo.meta.title ? 
            photo.meta.title :
            `Foto N-${key+1} subida el ${currentTime}`
        );
        formData.append("description", photo.meta.description);
        formData.append("image", photo.photo);
        // Send our permissions
        formData.append("permission", photo.meta.cc !== null ? 
            photo.meta.cc : photos.cc[0])

        fetch("/api/photos/", {
            method: 'POST',
            headers: header,
            body: formData
        }).then(function(response){
            const r = response
            if(r.status === 201){
                return dispatch({type: 'UPLOADED_PHOTO', data: null})
            }else{
                dispatch({
                    type: 'ERROR_UPLOADING', 
                    data: {
                        photo_id: key,
                        response: r.data
                    }
                })
                throw r.data
            }
        })
    })
}}

export const setUploading = () => { return (dispatch, getState) => {
    return dispatch({type: 'UPLOADING', data: null});
}}

export const readDisclosure = () => { return (dispatch, getState) => {
    return dispatch({type: 'READ_DISCLOSURE', data: null});
}}