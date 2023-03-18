import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { ContextApi } from '../../context';

const Tops = () => {

    const { rankedMovies, nowPlayingMovies, popularMovies, getSimilarMovies, setLocalStorage } = useContext(ContextApi);
    
    const getDataRankMovie = event => {
        const datt = (event.currentTarget.id)
        // eslint-disable-next-line eqeqeq
        const actual = rankedMovies.filter((x,arr) => x.id == datt)
        
        const valActual = {
            id: actual[0].id,
            title: actual[0].title,
            originalTitle: actual[0].originalTitle,
            poster: actual[0].poster,
            posterFondo: actual[0].posterFondo,
            overview: actual[0].overview,
            vote: actual[0].vote,
            year: actual[0].year,
            genre: actual[0].genre
        }
        getSimilarMovies(valActual.genre)
        setLocalStorage(valActual)
        window.scroll(0, 0)
    }
    const getDataMovieNow = event => {
        const datt = (event.currentTarget.id)
        // eslint-disable-next-line eqeqeq
        const actual = nowPlayingMovies.filter((x,arr) => x.id == datt)
        
        const valActual = {
            id: actual[0].id,
            title: actual[0].title,
            originalTitle: actual[0].originalTitle,
            poster: actual[0].poster,
            posterFondo: actual[0].posterFondo,
            overview: actual[0].overview,
            vote: actual[0].vote,
            year: actual[0].year,
            genre: actual[0].genre
        }
        getSimilarMovies(valActual.genre)
        setLocalStorage(valActual)
        window.scroll(0, 0)
    }
    const getDataMoviePop = event => {
        const datt = (event.currentTarget.id)
        // eslint-disable-next-line eqeqeq
        const actual = popularMovies.filter((x,arr) => x.id == datt)
        
        const valActual = {
            id: actual[0].id,
            title: actual[0].title,
            originalTitle: actual[0].originalTitle,
            poster: actual[0].poster,
            posterFondo: actual[0].posterFondo,
            overview: actual[0].overview,
            vote: actual[0].vote,
            year: actual[0].year,
            genre: actual[0].genre
        }
        getSimilarMovies(valActual.genre)
        setLocalStorage(valActual)
        window.scroll(0, 0)
    }

    return (
    <>
        <div className='cartelera_rankings'>
            <div className='cartelera_topRankings'>
                <h4>Top Ranking</h4>
            </div>
            <div className='cartelera_boxesRankings'>
                {rankedMovies ? (
                    rankedMovies.slice(0,5).map(movie => (
                    <Link to="/PageMovie" key={movie.id} className='cartelera_boxLink'>
                        <div className='cartelera_boxRankings' onClick={getDataRankMovie} id={movie.id}>
                            <img src={`${movie.poster}`} alt={movie.originalTitle}/>
                            <div className='cartelera_boxInfo'>
                                <h3>{movie.title}</h3>
                                <div className='cartelera_boxVotyDate'>
                                    <p>{movie.vote}</p>
                                    <p>{movie.year}</p>
                                    <p>HD</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                    ))
                ): null}
            </div>
        </div>
        <div className='cartelera_rankings'>
            <div className='cartelera_topRankings'>
                <h4>Top estrenos</h4>
            </div>
            <div className='cartelera_boxesRankings'>
                {nowPlayingMovies ? (
                    nowPlayingMovies.slice(0,5).map(movie => (
                    <Link to="/PageMovie" key={movie.id}>
                    <div className='cartelera_boxRankings' onClick={getDataMovieNow} id={movie.id}>
                        <img src={`${movie.poster}`} alt={movie.originalTitle}/>
                        <div className='cartelera_boxInfo'>
                            <h3>{movie.title}</h3>
                            <div className='cartelera_boxVotyDate'>
                                <p>{movie.vote}</p>
                                <p>{movie.year}</p>
                                <p>HD</p>
                            </div>
                        </div>
                    </div>
                    </Link>
                    ))
                ): null}
            </div>
        </div>
        <div className='cartelera_rankings'>
            <div className='cartelera_topRankings'>
                <h4>Más populares</h4>
            </div>
            <div className='cartelera_boxesRankings'>
                {popularMovies ? (
                    popularMovies.slice(0,5).map(movie => (
                    <Link to="/PageMovie" key={movie.id}>
                    <div className='cartelera_boxRankings' onClick={getDataMoviePop} id={movie.id}>
                        <img src={movie.poster} alt={movie.originalTitle}/>
                        <div className='cartelera_boxInfo'>
                            <h3>{movie.title}</h3>
                            <div className='cartelera_boxVotyDate'>
                                <p>{movie.vote}</p>
                                <p>{movie.year}</p>
                                <p>HD</p>
                            </div>
                        </div>
                    </div>
                    </Link>
                    ))
                ): null}
            </div>
        </div>
    </>
)
}

export default Tops