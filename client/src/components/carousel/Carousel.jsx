import { useContext, useEffect, useState } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Button } from 'react-bootstrap';
import { ContextApi } from '../../context'
import { Link } from 'react-router-dom';

function CarouselReact() {

    const {nowPlayingMovies, getSimilarMovies, setLocalStorage} = useContext(ContextApi)

    const[animationInfo, setAnimationInfo] = useState(false);

    const getDataMovieOnClick = event => {
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
    }
    useEffect(() => {
        setTimeout(function() {
            setAnimationInfo(true)
        }, 5000);
    },[])
    
    return (
        <>
        <Carousel>
        {nowPlayingMovies? (
            nowPlayingMovies.slice(0,4).map((movie, i) => (
            <Carousel.Item interval={5000} className='carousel_item' key={movie.id}>
                <div className='carousel_probanding'></div>
                <img
                className="d-block w-100 carousel_imgs"
                src={movie.posterFondo}
                alt="First slide"
                />
                <Carousel.Caption className={`${
                        animationInfo === false
                        ? 'carousel_animated'
                        : 'carousel_info'
                        }`}key={movie.id}>
                    <div className='carousel_info_title'>
                        <h3>{movie.title}</h3>
                    </div>
                    <div className='carousel_info_popup'>
                        <p>{movie.vote}</p>
                        <p className='carousel_boton'>Pelicula</p>
                        <p className='carousel_boton'>HD</p>
                    </div>
                    <div className='carousel_info_p'>
                        <p>{movie.overview}</p>
                    </div>
                    <Link  className='carousel_goToMovie' to='/PageMovie'>
                        <Button onClick={getDataMovieOnClick} id={movie.id}>
                            <PlayArrowIcon/>
                            <p>Ver pelicula</p>
                        </Button>
                    </Link>
                </Carousel.Caption>
            </Carousel.Item>
            ))) : null}
        </Carousel>
        </>
    );
}

export default CarouselReact;