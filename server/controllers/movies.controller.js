import Movie from '../models/Movie.js';
import { uploadImage } from '../libs/cloudinary.js';

export const getMovies = async(req, res) => {
    try {
        const movies = await Movie.find()
        res.send(movies)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const createMovie = async(req, res) => {
    try {
        const {id, title} = req.body 

        if(req.files.poster){
            const result = await uploadImage(req.files.poster.tempFilePath)
        }
        const newMovie = new Movie({id, title})

        await newMovie.save()

        return res.json(newMovie)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const updateMovie = async(req, res) => {
    try {
        const movieUpdate = await Movie.findByIdAndUpdate(req.params.id, req.body, {new: true})

        if (!movieUpdate) return res.sendStatus(404)
        return res.status(202).send(movieUpdate)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const deleteMovie = async(req, res) => {
    try {
        const movieDelete = await Movie.findByIdAndDelete(req.params.id)

        if (!movieDelete) return res.sendStatus(404)
        else return res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getMovieById = async(req, res) => {
    try {
        const movieById = await Movie.findById(req.params.id)

        if (!movieById) return res.sendStatus(404)
        else return res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}