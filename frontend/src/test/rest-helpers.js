
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

export {
    getNews,
    getAlbum,
    getPictures
}