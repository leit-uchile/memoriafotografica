const initialState = {
    photos: [],
    all_tags: [],
    all_iptcs: [],
}

export default function home(state=initialState,action){
    switch (action.type){
        case 'RECOVERED_PHOTO':
            return {...state, photos : action.data};
        case 'EMPTY':
            return{...state, errors: action.data};
        case 'DETAIL':
            return{...state, imageDetails: action.data};
        case 'RECOVERED_TAGS':
            return {...state, all_tags: action.data};
        case 'EMPTY_TAGS':
            console.log('EMPTY_TAGS',action.data);
            return {...state, all_tags: []};
        case 'RECOVERED_CATS':
            return {...state, all_cats: action.data};
        case 'EMPTY_CATS':
            return {...state, all_cats: []};
        case 'RECOVERED_IPTCS':
            return {...state, all_iptcs: action.data};
        case 'EMPTY_IPTCS':
            return {...state, all_iptcs: []};
        default:
            return state
    }

}