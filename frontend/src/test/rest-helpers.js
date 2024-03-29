
/**
 * Helper to create a group of pictures
 * @param {*} approved 
 * @param {*} number 
 */
const getPictures = (approved, number) => {
    let results = []
    for (let index = 0; index < number; index++) {
        results.push({
            image: "https://raw.githubusercontent.com/JasonFritsche/motivationalCats/master/img/github_logo.png",
            thumbnail: "https://raw.githubusercontent.com/JasonFritsche/motivationalCats/master/img/github_logo.png",
            id: index + Date.now(),
            title: "photo title",
            aspect_h: 480,
            aspect_w: 320,
            approved: approved,
        })
    }
    return results
}

/**
 * Helper to create an album object
 * @param {*} title 
 * @param {*} collection 
 * @param {*} id 
 */
const getAlbum = (title, collection, id) => ({
    id: id,
    name: title,
    description: "description",
    updated_at: "2020-09-16T11:13:31-03:00",
    thumbnail: "https://raw.githubusercontent.com/JasonFritsche/motivationalCats/master/img/github_logo.png",
    collection: collection,
})

/**
 * Random news generator
 * @param {*} number 
 */
const getNews = (number) => {
    let results = []
    for (let index = 0; index < number; index++) {
        results.push({
            id: index + Date.now(),
            image: "https://raw.githubusercontent.com/JasonFritsche/motivationalCats/master/img/github_logo.png",
            title: "headline",
            subtitle: "sub headline",
            content: "big large text",
            created_at: "2020-02-24T16:00:12-03:00",
            updated_at: "2020-02-24T16:00:12-03:00"
        })
    }
    return results
}

/**
 * Helper to create a group of reports
 * @param {*} number 
 */
const getReports = (number) => {
    let results = []
    for (let index = 0; index < number; index++) {
        {
            index % 3 === 0
                ? results.push({
                    content: "Finge ser otra persona",
                    content_id: {
                        id: index,
                        first_name: "first",
                        last_name: "last",
                    },
                    created_at: "2021-03-20T16:13:13-03:00",
                    id: index,
                    resolved: false,
                    type: 1,
                    updated_at: "2021-03-20T16:13:13-03:00"
                })
                : index % 3 === 1
                    ? results.push({
                        content: "Usuario no es autor del contenido",
                        content_id: {
                            id: index,
                            thumbnail: "",
                        },
                        created_at: "2021-03-20T16:13:13-03:00",
                        id: index,
                        resolved: false,
                        type: 2,
                        updated_at: "2021-03-20T16:13:13-03:00"
                    })
                    : results.push({
                        content: "Incita a la violencia",
                        content_id: {
                            id: index,
                            content: "comment"
                        },
                        created_at: "2021-03-20T16:13:13-03:00",
                        id: index,
                        resolved: false,
                        type: 3,
                        updated_at: "2021-03-20T16:13:13-03:00"
                    })

        }
    }
    return results
}

/**
 * Helper to create a user object
 * @param {*} id 
 * @param {*} firstname
 * @param {*} lastname
 * @param {*} isStaff
 * @param {*} isPublic 
 */
const getUser = (id, firstname, lastname, isStaff, isPublic) => ({
    avatar: null,
    id: id,
    first_name: firstname,
    last_name: lastname,
    rol: '1',
    is_staff: isStaff,
    public_profile: isPublic,
})

export {
    getPictures,
    getAlbum,
    getNews,
    getReports,
    getUser
}