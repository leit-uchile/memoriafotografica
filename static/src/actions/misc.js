export const setCurrentRoute = (route) => {
    if(route === undefined || route === null){
        return (dispatch,getState) => {
            dispatch({type: 'INVISIBLE_ROUTE', data: null})
        }
    }else{
        return (dispatch,getState) => {
            dispatch({type: 'SET_ROUTE', data: route})
        }
    }
}