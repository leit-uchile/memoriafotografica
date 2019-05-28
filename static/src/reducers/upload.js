const initialState = {
    uploading: false
}

export default function upload(state=initialState, action){
    switch (action.type){
        case 'UPLOADING':
            return {...state, uploading: true};
        case 'UPLOADED':
            return {...state, uploading: false, buffered: null};
        case 'BUFFER_INFO':
            return {...state, buffered: action.data}
        case 'UPLOADED_PHOTO':
            return {...state, uploading: false}
        case 'ERROR_UPLOADING':
            return {...state, uploading: false, error: action.data}
        default:
            return {...state};
    }
}