const initialState = {
    details: {
        title: '[Titulo]',
        image: undefined,
        desc: undefined
    },
    errors: 'INVALID_URL',
    commentsLoaded: false
}

export default function photoDetails(state=initialState, action){
    switch (action.type){
        case 'RECOVERED_PHOTO_DETAILS':
            return {...state, details: action.data};
        case 'ERROR_ON_FETCH':
            return {...state, errors: action.data};
        case 'CREATED_COMMENT':
            return {...state, new_comment: action.data};
        case 'ERROR_ON_NEW_COMMENT':
            return {...state, new_comment_errors: action.data};
        case 'RECOVERED_PHOTO_COMMENTS':
            return {...state, comments: action.data, commentsLoaded: true};
        case 'ERROR_ON_COMMENT_FETCH':
            return {...state, comments: [], commentsLoaded: false};
        default:
            return state;
    }
}