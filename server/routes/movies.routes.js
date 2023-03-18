import { Router } from "express";
import { getLinks, getLinksByNewId, getMoviesCueva } from "../cuevaApiController/cuevaApi.js";

const router = Router()

// type: 0 a 6
router.get('/moviesCueva/:type', getMoviesCueva)

router.get('/linksByIdByName/:query',getLinksByNewId)

// router.get('/movies', getMovies)

// router.post('/movies', createMovie)

// router.put('/movies/:id', updateMovie)

// router.delete('/movies/:id', deleteMovie)

// router.get('/movies/:id', getMovieById)

export default router