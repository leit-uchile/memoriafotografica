const initialState = {
    metaIDs: []
}

export default function search(state=initialState,action){
    switch (action.type){
        case 'PUT_META':
            var newMetaIDs = state.metaIDs.filter( el => el != action.data)
            return {...state, metaIDs: [...newMetaIDs, action.data]};
        case 'REMOVE_META':
            var newMetaIDs = state.metaIDs.filter( el => el != action.data)
            return{...state, metaIDs: [...newMetaIDs]};
        default:
            return state
    }

}