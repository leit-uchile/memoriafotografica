const initialState = {
  reports: [],
  photos: [],
  categories: [],
  loading: false,
  error: "",
  refresh:false,
}

export default function curador(state = initialState, action){
  switch (action.type){
    case 'RECOVERED_CATS':
        return {...state, categories: action.data};
    case 'EMPTY_CATS':
        return {...state, categories: []};

    case 'RECOVERED_PHOTOS':
      return {...state, photos: action.data}
    case 'EMPTY_PHOTOS':
      return {...state, photos: []}
    case 'RECOVERED_REPORT':
      return {...state, reports : action.data}
    case 'EMPTY_REPORTS':
      return {...state, reports : []}
    case 'LOADING':
      return {...state, loading: true}
    case 'COMPLETED':
      return {...state, loading: false}
    case 'CREATED_CAT':
      return {...state, loading: false}
    case 'REFRESH':
      return {...state, refresh: true}
    case 'ERROR_CREATING':
      return {...state, loading: false, error: "Hubo un error creando la categoría."}
    case 'ERROR_DELETING':
      return {...state, loading: false, error: "Hubo un error eliminando la categoría."}
    case 'ERROR':
      return {...state, loading: false, error: "Se produjo un error, intente nuevamente. Si persiste, contacte gente especializada."}

    default:
      return state
  }
}
