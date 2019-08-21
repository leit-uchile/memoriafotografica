const initialState = {
    metaIDs: []
}

export default function search(state=initialState,action){
    switch (action.type){
        case 'PUT_META':
            return {...state, metaIDs: [...state.metaIDs, action.data]};
        case 'REMOVE_META':
            const newMetaIDs = state.metaIDs.filter( el => el !== action.data)
            return{...state, metaIDs: newMetaIDs};
        default:
            return state
    }

}