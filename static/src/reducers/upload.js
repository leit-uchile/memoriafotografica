const initialState = {
    uploading: false,
    disclosureSet: localStorage.getItem("disclosed") == "true" ? true : false,
}

export default function upload(state=initialState, action){
    switch (action.type){
        case 'UPLOADING':
            return {
                ...state,
                uploading: true
            };
        case 'UPLOADED':
            return {
                ...state,
                uploading: false,
                buffered: null
            };
        case 'BUFFER_INFO':
            return {
                ...state,
                buffered: action.data
            };
        case 'UPLOADED_PHOTO':
            return {
                ...state,
                uploading: false
            };
        case 'ERROR_UPLOADING':
            // Assume that a component will resolve the id in action.data
            return {
                ...state, 
                uploading: false,
                error: action.data
            };
        case 'READ_DISCLOSURE':
                localStorage.setItem("disclosed",true);
                return {...state, disclosureSet: true}
        default:
            return {...state};
    }
}