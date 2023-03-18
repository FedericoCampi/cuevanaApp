import React, { useContext } from 'react';
import { ContextApi } from '../../context';
import OffCanvas from '../offCanvas/OffCanvas';
import MoviesServers from './MoviesServers';

const PageMovie = () => {

    const { getLinksMovie, datosMovie, similarMovies, rankedMovies, nowPlayingMovies, getSimilarMovies, setLocalStorage} = useContext(ContextApi);

    const getDataMovieOnClick = event => {
        const datt = (event.currentTarget.id)
        // eslint-disable-next-line eqeqeq
        const actual = similarMovies.filter((x,arr) => x.id == datt)
    
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
        getLinksMovie(valActual.title)
        getSimilarMovies(valActual.genre)
        setLocalStorage(valActual)
        window.scroll(0, 0)
    }
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

    return (
    <>
    <div className='PageMovie_headerContainer'>
        { datosMovie.posterFondo.substring(datosMovie.posterFondo.length-4, datosMovie.length) === 'null' ? 
        <img src={datosMovie.poster} alt={datosMovie.originalTitle}/> :
        <img src={datosMovie.posterFondo} alt={datosMovie.originalTitle}/> 
        }
        <div className='PageMovie_headerDiv'>
            <OffCanvas/>
            <div className='PageMovie_InfoDiv'>
                <div className='PageMovie_InfoImg'>
                    <img src={datosMovie.poster} alt={datosMovie.originalTitle}/>
                </div>
                <div className='PageMovie_InfoData'>
                    <h2>{datosMovie.title}</h2>
                    <h3>{datosMovie.originalTitle}</h3>
                    <div className='PageMovie_InfoVaria'>
                        <h4>Rate:  {datosMovie.vote}</h4>
                        <h4>Year:  {datosMovie.year}</h4>
                    </div>
                    <div className='PageMovie_InfoDataDiv'>
                        <p>{datosMovie.overview}</p>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
    <div className='PageMovie_main'>
        <MoviesServers/>
        <div className='PageMovie_thenMovie'>
            { similarMovies ? 
            <div className='PageMovie_similar'>
                <h3>PELICULAS RELACIONADAS</h3>
                <div className='PageMovie_similarMovies'>
                {similarMovies.map(movie => (
                    (movie.poster.substring(movie.poster.length-4, movie.length)) !== 'null' ? (
                        <div className='PageMovie_similarMovie' key={movie.id} id={movie.id} onClick={getDataMovieOnClick} style={{cursor:'pointer'}}>
                            <img src={movie.poster} alt={movie.title}/>
                            <h4>{movie.title}</h4>
                        </div>
                    ) : null
                ))}
                </div>
            </div>
            : null }
            <div className='PageMovie_topics'>
                <div className='PageMovie_topRank'>
                    <div className='PageMovie_topRankings'>
                        <h4>Top Ranking</h4>
                    </div>
                    <div className='PageMovie_boxesRankings'>
                        {rankedMovies ? (
                            rankedMovies.slice(0,5).map(movie => (
                            <div className='PageMovie_boxRankings' key={movie.id} id={movie.id} onClick={getDataRankMovie} style={{cursor:'pointer'}}>
                                <img src={`${movie.poster}`} alt={movie.originalTitle}/>
                                <div className='PageMovie_boxInfo'>
                                    <h3>{movie.title}</h3>
                                    <div className='PageMovie_boxVotyDate'>
                                        <p>{movie.vote}</p>
                                        <p>{movie.year}</p>
                                        <p>HD</p>
                                    </div>
                                </div>
                            </div>
                            ))
                        ): null
                        }
                    </div>
                </div>
                <div className='PageMovie_topRank'>
                    <div className='PageMovie_topRankings'>
                        <h4>Lastest movies</h4>
                    </div>
                    <div className='PageMovie_boxesRankings'>
                        {nowPlayingMovies ? (
                            nowPlayingMovies.slice(0,5).map(movie => (
                            <div className='PageMovie_boxRankings' key={movie.id} id={movie.id} onClick={getDataMovieNow} style={{cursor:'pointer'}}>
                                <img src={`${movie.poster}`} alt={movie.originalTitle}/>
                                <div className='PageMovie_boxInfo'>
                                    <h3>{movie.title}</h3>
                                    <div className='PageMovie_boxVotyDate'>
                                        <p>{movie.vote}</p>
                                        <p>{movie.year}</p>
                                        <p>HD</p>
                                    </div>
                                </div>
                            </div>
                            ))
                        ): null
                        }
                    </div>
                </div>

            </div>
        </div>
    </div>
    </>
)
}

export default PageMovie