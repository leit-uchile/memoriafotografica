const initialState = {
    photos: []
}

export default function user(state=initialState, action){
    switch (action.type){
        case 'RECOVERED_PHOTO':
           return {...state, photos: action.data} ;
        case 'EMPTY':
            return {...state, errors:action.data};
        case 'DETAIL':
            return{...state, imageDetails:action.data};
        default:
            return state
    }
}