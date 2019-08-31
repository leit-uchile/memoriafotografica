const initialState = {
  reports: [],
  photos: [],
  categories: []
}

export default function curador(state = initialState, action){
  switch (action.type){
    case 'RECOVERED_REPORT':
      return {...state, reports : action.data}
    case 'EMPTY_REPORTS':
      return {...state, reports : []}
    default:
      return state
  }
}
