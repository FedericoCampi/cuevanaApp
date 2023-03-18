import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { getLinks } from './api/movies';

// creando contexto / lo que tenemos que consumir
export const ContextApi = createContext();

// crear el provider, para proveer de datos a los componentes
// el que nos provee de acceso al contexto
export function ContextProvider({ children }){

    const API_KEY = 'c78f74a41d309913c3ee093097fa3185'
    const SPANISH = 'es'
    const API_URL = 'https://api.themoviedb.org/3'
    const IMAGE_PATH = 'https://image.tmdb.org/t/p/original';
    const POPULAR = '/movie/popular'
    const TOP_RATED = '/movie/top_rated'
    const NOW_PLAYING = '/movie/now_playing'

    const API_YOUTUBE = 'https://www.googleapis.com/youtube/v3/search'
    const YOUTUBE_APIKEY = 'AIzaSyDzzE5LilwPy0rrgqgFZBefKpvWk-byRFw'
    
    const [movies, setMovies] = useState([]);
    const [datosMovie, setDatosMovie]= useState(
        JSON.parse(window.localStorage.getItem('data'))
    );
    const [similarMovies, setSimilarMovies] = useState(
        JSON.parse(window.localStorage.getItem('dataSimilar'))
    );
    const [searchKey, setSearchKey] = useState({
        key: ''
    })
    const [popularMovies, setPopularMovies] = useState([]);
    const [rankedMovies, setRankedMovies] = useState([]);
    const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
    const [colorSection, setColorSection] = useState('lastest');
    const [trailerYoutube, setTrailerYoutube] = useState(
        JSON.parse(window.localStorage.getItem('dataTrailer'))
    );
    const [linksMovie, setLinksMovie] = useState(
        JSON.parse(window.localStorage.getItem('dataLinks'))
    );

    const fetchMovies = async(searchKey, page) =>{
        // const type = searchKey ? 'search' : 'discover'
        let type = ''
        if(!searchKey || searchKey === ''){
            type = 'discover'
        }else{
            type = 'search'
        }
        
        const pageMovie = page ? page : 1
        const {data: { results },
        } = await axios.get(`${API_URL}/${type}/movie`,{
            params: {
                api_key: API_KEY,
                language: SPANISH,
                query: searchKey,
                page: pageMovie
            }
        })
        const movieData = results?.map(movie => ({
            id: movie.id,
            posterFondo: `${IMAGE_PATH}`+ movie.backdrop_path,
            poster: `${IMAGE_PATH}`+ movie.poster_path,
            title: movie.title,
            overview: movie.overview,
            vote: movie.vote_average,
            year: movie.release_date.substring(0,4),
            originalTitle: movie.original_title,
            genre: movie.genre_ids[0]
        }))
        setMovies(movieData)
    }
    const getSimilarMovies = async(id) => {
        const genre = id
        const {data: { results },
        } = await axios.get(`${API_URL}/movie/${genre}/similar`,{
            params: {
                api_key: API_KEY,
                language: SPANISH,
            }
        })
        const movieData = results?.map(movie => ({
            id: movie.id,
            posterFondo: `${IMAGE_PATH}`+ movie.backdrop_path,
            poster: `${IMAGE_PATH}`+ movie.poster_path,
            title: movie.title,
            overview: movie.overview,
            vote: movie.vote_average,
            year: movie.release_date.substring(0,4),
            originalTitle: movie.original_title,
            genre: movie.genre_ids[0]
        }))
        setSimilarMovies(movieData)
        window.localStorage.setItem('dataSimilar', JSON.stringify(movieData))
    }
    const getMoviesByGenre = async(id) =>{
        try {
            const genre = id
            const {data: {results},
            } = await axios.get(`${API_URL}/discover/movie`,{
                params: {
                    api_key: API_KEY,
                    language: SPANISH,
                    sort_by: 'popularity.desc',
                    page: 1,
                    with_genres: genre,
                    with_watch_monetization_types: 'flatrate'
                }
            })
            const movieData = results?.map(movie => ({
                id: movie.id,
                posterFondo: `${IMAGE_PATH}`+ movie.backdrop_path,
                poster: `${IMAGE_PATH}`+ movie.poster_path,
                title: movie.title,
                overview: movie.overview,
                vote: movie.vote_average,
                year: movie.release_date.substring(0,4),
                originalTitle: movie.original_title,
                genre: movie.genre_ids[0]
            }))
            setMovies(movieData)
        } catch (error) {
            console.log(error)
        }
    }
    const getSearchMovies = () => {
        fetchMovies(searchKey.key)
    }
    const getPagination = (page) => {
        fetchMovies('',page)
    }
    const getPopularMovies = async () => {
        try {
            const {data: {results},
            } = await axios.get(`${API_URL}${POPULAR}`,{
                params: {
                    api_key: API_KEY,
                    language: SPANISH
                }
            })
            const movieData = results?.map(movie => ({
                id: movie.id,
                posterFondo: `${IMAGE_PATH}`+ movie.backdrop_path,
                poster: `${IMAGE_PATH}`+ movie.poster_path,
                title: movie.title,
                overview: movie.overview,
                vote: movie.vote_average,
                year: movie.release_date.substring(0,4),
                originalTitle: movie.original_title,
                genre: movie.genre_ids[0]
            }))
            setPopularMovies(movieData)
        } catch (error) {
            console.log(error)
        }
    }
    const getRankedMovies = async () => {
        try {
            const {data: {results},
            } = await axios.get(`${API_URL}${TOP_RATED}`,{
                params: {
                    api_key: API_KEY,
                    language: SPANISH
                }
            })
            const movieData = results?.map(movie => ({
                id: movie.id,
                posterFondo: `${IMAGE_PATH}`+ movie.backdrop_path,
                poster: `${IMAGE_PATH}`+movie.poster_path,
                title: movie.title,
                overview: movie.overview,
                vote: movie.vote_average,
                originalTitle: movie.original_title,
                year: movie.release_date.substring(0,4),
                genre: movie.genre_ids[0]
            }))
            setRankedMovies(movieData)
        } catch (error) {
            console.log(error)
        }
    }
    const getNowPlaying = async () => {
        try {
            const {data: {results},
            } = await axios.get(`${API_URL}${NOW_PLAYING}`,{
                params: {
                    api_key: API_KEY,
                    language: SPANISH
                }
            })
            const movieData = results?.map(movie => ({
                id: movie.id,
                posterFondo: `${IMAGE_PATH}`+ movie.backdrop_path,
                poster: `${IMAGE_PATH}`+ movie.poster_path,
                title: movie.title,
                overview: movie.overview,
                vote: movie.vote_average,
                originalTitle: movie.original_title,
                year: movie.release_date.substring(0,4),
                genre: movie.genre_ids[0]
            }))
            setNowPlayingMovies(movieData)
            
        } catch (error) {
            console.log(error)
        }
    }
    const setLocalStorage = value => {
        try {
            setDatosMovie(value)
            window.localStorage.setItem('data', JSON.stringify(value))
        } catch (error) {
            console.log(error)
        }
    }
    const getTrailerYoutube = async(originalName) =>{
        const name = originalName 
        const {data: { items },
        } = await axios.get(`${API_YOUTUBE}`,{
            params: {
                key: YOUTUBE_APIKEY,
                q: name + 'official trailer',
                type: 'video'
            }
        })
        const movieTrailerData = items?.map(item => ({
            kind: item.id.kind,
            videoId: item.id.videoId,
            name: name
        }))
        setTrailerYoutube(movieTrailerData)
        window.localStorage.setItem('dataTrailer', JSON.stringify(movieTrailerData))
    }
    const getLinksMovie = async(title) => {
        const links = await getLinks(title)
        setLinksMovie(links)
        window.localStorage.setItem('dataLinks', JSON.stringify(links))
    }   
    
    useEffect(() => {
        fetchMovies();
        getPopularMovies()
        getRankedMovies()
        getNowPlaying()
        setColorSection('lastest')
    },[])

    return(
        <ContextApi.Provider value={{
            fetchMovies,
            setMovies,
            movies,
            getPagination,
            setDatosMovie,
            searchKey,
            setSearchKey,
            setLocalStorage,
            popularMovies,
            rankedMovies,
            nowPlayingMovies,
            getSearchMovies,
            getSimilarMovies,
            datosMovie,
            similarMovies,
            getMoviesByGenre,
            colorSection,
            setColorSection,
            trailerYoutube,
            getTrailerYoutube,
            getLinksMovie,
            linksMovie
        }}>
            {children}
        </ContextApi.Provider>
    )
}