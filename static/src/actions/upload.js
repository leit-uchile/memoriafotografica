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
            header,
            body: formData
        });
    }
}