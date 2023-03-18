import React, { useContext, useEffect, useState } from 'react'
import Tops from './Tops';
import MoviesCart from './MoviesCart'
import { ContextApi } from '../../context';

const Carteler = () => {

    const { colorSection, setColorSection, setMovies, popularMovies, fetchMovies, rankedMovies } = useContext(ContextApi);
    
    const lastMovies = (e) =>{
        e.preventDefault();
        fetchMovies()
        setColorSection('lastest')
    }
    const rankingMovies = (e) =>{
        e.preventDefault();
        setMovies(rankedMovies)
        setColorSection('ranked');
    }
    const moreViewsMovies = (e) =>{
        e.preventDefault();
        setMovies(popularMovies)
        setColorSection('moreView')
    }

    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        window.addEventListener("scroll", listenToScroll);
            return () => 
            window.removeEventListener("scroll", listenToScroll); 
    },[])
    const listenToScroll = () => {
        let heightToHideFrom = 80;

        const winScroll = document.body.scrollTop || 
            document.documentElement.scrollTop;
        
        if (winScroll > heightToHideFrom) {  
            setIsVisible(false);
        }
    };
    
    return (
        <div className='cartelera_container' >
            <div className='cartelera_grilla' id='#bottomMenu'> 
                <div className={isVisible === false ? 'cartelera_sectionhide' : 'cartelera_section'}>
                    {isVisible === false ?
                    <div className='cartelera_section1'>
                        <div className='cartelera_buttons'>
                        <h2>Películas online</h2>
                            <button className={colorSection === 'lastest' ? 'cartelera_buttonPress' : 'cartelera_button'}
                            onClick={lastMovies}>Ultimas</button>
                            <button className={colorSection === 'ranked' ? 'cartelera_buttonPress' : 'cartelera_button'} 
                            onClick={rankingMovies}>Ranking</button>
                            <button className={colorSection === 'moreView' ? 'cartelera_buttonPress' : 'cartelera_button'} 
                            onClick={moreViewsMovies}>Más vistas</button>
                        </div>
                    </div>
                    : null}
                </div>
                <div>
                    <MoviesCart/>
                </div>
            </div>
            <div className='cartelera_columna'>
                <Tops/>
            </div>
        </div>
    )
}

export default Carteler