import axios from 'axios'

export const getMoviesRequest = async(tipo) => {
    const type = tipo ? tipo : 0
    const results = await axios.get(`moviesCueva/${type}`)
    return results.data
}

export const getLinks = async(title) => {
    const results = await axios.get(`linksByIdByName/${title}`)
    return results.data
}