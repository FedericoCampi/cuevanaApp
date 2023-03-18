import React, { useContext, useState } from "react"
import SearchIcon from '@mui/icons-material/Search';
import { ContextApi } from "../../context";
import { Link } from "react-router-dom";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

const MoviesCart = () => {

    const {getPagination, getLinksMovie, movies, getTrailerYoutube, searchKey, setSearchKey ,getSearchMovies, setLocalStorage ,getSimilarMovies} = useContext(ContextApi);
    
    const [pagination, setPagination] = useState(1);
    
    const backMovieButton = () => {
        let count = pagination - 1
        setPagination(count)
        getPagination(count)
    }
    const nextMovieButton = () => {
        let count = pagination + 1
        setPagination(count)
        getPagination(count)
    }
    
    const handleInputChange = (event) => {
        setSearchKey({
            ...searchKey,
            [event.target.name] : event.target.value
        })
    }

    const enviarDatos = (event) => {
        event.preventDefault()
        getSearchMovies()
        event.target.reset();
    }

    const getDataMovieOnClick = event => {
        const datt = (event.currentTarget.id)
        // eslint-disable-next-line eqeqeq
        const actual = movies.filter((x,arr) => x.id == datt)
        
        const valActual = {
            id: actual[0].id || null,
            title: actual[0].title,
            originalTitle: actual[0].originalTitle || null,
            poster: actual[0].poster || null,
            posterFondo: actual[0].posterFondo || null,
            overview: actual[0].overview || null,
            vote: actual[0].vote || null,
            year: actual[0].year || null,
            genre: actual[0].genre || null
        }
        getLinksMovie(valActual.title)
        getSimilarMovies(valActual.genre)
        getTrailerYoutube(valActual.originalTitle)
        setLocalStorage(valActual)
        window.scroll(0, 0)
    }

    return (
        <div>
        {movies ? (
            <div className="cartelera_MoviesCartConta">
                <div className='cartelera_search'>
                    <form onSubmit={enviarDatos} className='cartelera_form'>
                        <input onChange={handleInputChange} name="key" id='key'type="text" placeholder="Buscar peliculas.." ></input>
                        <button type='submit'>
                            <SearchIcon className='cartelera_searchIcon'/>
                        </button>
                    </form>
                </div>
                <div className='cartelera_row' id="cartelerMovies">
                    {movies.map(movie =>(
                        movie.poster.substring(movie.poster.length -4, movie.poster.length) !== 'null' ?
                        <div className='cartelera_movies' key={movie.id} onClick={getDataMovieOnClick} id={movie.id}>
                            <Link to="/PageMovie" className="cartelera_moviesLink">
                                <img src={movie.poster} alt={movie.title}/>
                                <h4>{movie.title}</h4>
                            </Link>
                        </div>
                        : null
                    ))}
                </div>
                <div className="pagination">
                    <button disabled={pagination === 1 ? true : false}
                        className={pagination === 1 ? 'pagination_boxesDisabled' : 'pagination_boxes'}
                        onClick={backMovieButton}
                    >
                        <NavigateBeforeIcon fontSize="large" />
                    </button>
                    <button 
                        className="pagination_boxes"
                        onClick={nextMovieButton}
                    > 
                        <NavigateNextIcon fontSize="large"/>
                    </button>
                </div>
            </div>
        ) : null}
        </div>
    )
}

export default MoviesCart