export const uploadImage = (name,description,image) => {
    return (dispatch, getState) => {
        let header = {"Content-Type": "application/json"};

        /*
        let fileReader = new FileReader();
        fileReader.onload = e => {
            var imgRead = e.target.result;
            let body = JSON.stringify({name,description,image : imgRead})
            fetch("/gallery/photo/",{header,body,method: "POST"}).then(
                res => {
                    if(res.status < 500){
                        console.log(res);
                    }else{
                        console.error(res);
                    }
                }
            )
        };
        fileReader.readAsText(image);
        */

        var reader = new FileReader();
        reader.onload = e => {
            var img64 = e.target.result;
            console.log(img64);
        }
        reader.readAsDataURL(image);

        var formData = new FormData();
        formData.append("name",name);
        formData.append("description",description);
        formData.append("image",image);
       
        fetch("/gallery/photo/", {
            method: 'POST',
            header,
            body: formData
        });
    }
}