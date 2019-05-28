export const putSearchItem = (metaID) => { return (dispatch, getState) => {
    return dispatch({type: 'PUT_META', data: metaID})
}}

export const removeSearchItem = (metaID) => { return (dispatch, getState) => {
    return dispatch({type: 'REMOVE_META', data: metaID})
}}