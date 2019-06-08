const initialState = {
    currentRoute: '/Inicio'
}

export default function misc(state=initialState, action){
    switch (action.type){
        case 'SET_ROUTE':
            return {...state, currentRoute: action.data};
        case 'INVISIBLE_ROUTE':
            return {...state, currentRoute: undefined};
        default:
            return {...state};
    }
}