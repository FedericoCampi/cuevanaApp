import React, { useContext } from 'react';
import image from '../../images/cueva-remove.png';
import SearchIcon from '@mui/icons-material/Search';
import ok from '../../images/icons/verify.png'
import security from '../../images/icons/globe-grid.png'
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { ContextApi } from '../../context';

const PageOne = () => {

    const navigate = useNavigate()
    const { getSearchMovies, setSearchKey, searchKey } = useContext(ContextApi);

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
        navigate("/MainPage")
        window.scrollTo(0, 600)
    }

    return (
        <div className='pageOne_container '>
            <div className='pageOne_title'>
                <div className='pageOne_securityIcons'>
                    <img src={ok} alt='security'/>
                    <img src={security} alt='security'/>
                </div>
                <div className='pageOne_titleImg'>
                    <img src={image} alt='imageTitle'/>
                </div>
            </div>
            <div className='pageOne_Notitle'>
                <div className='pageOne_searcher'>
                    <form className="pageOne_searchIntro" onSubmit={enviarDatos}>
                        <input onChange={handleInputChange} name="key" type="text" className="pageOne_input" placeholder="Buscar peliculas.."></input>
                        <Link to='/MainPage'>
                            <SearchIcon className="pageOne_SearchIcon"/>
                        </Link>
                    </form>
                    <Link to="/MainPage" className='pageOne_botonIngreso'>
                        <Button variant="contained">Ingresar a Cuevana</Button>
                    </Link>
                </div>
                <div className='pageOne_content'>
                    <div className='pageOne_content_info'>
                        <h3>Cuevana</h3>
                        <h4>Todas las peliculas de cuevana Online gratis</h4>
                        <p>¿Buscas una forma cómoda y fácil de ver películas online desde cualquier lugar? ¡Cuevana3 es la opción perfecta 
                            para ti! Con su diseño moderno y fácil de usar, podrás acceder al sitio web desde cualquier dispositivo, ya sea una computadora
                            , un celular o una tableta, y disfrutar de tus películas favoritas de forma cómoda. Y lo mejor de todo es que el contenido está 
                            disponible completamente gratis, sin cortes ni publicidad, en alta definición.
                            Pero eso no es todo. Hemos renovado Cuevana3 con un diseño único y atractivo que te facilitará encontrar las películas y series más vistas. Además, hemos añadido 
                            un acceso directo a ellas para que puedas disfrutar de lo mejor de Cuevana3 de manera aún más rápida y sencilla.
                            Como siempre, en Cuevana3 encontrarás una amplia variedad de películas y series subtituladas tanto en castellano como en latino. ¡No te pierdas la oportunidad de 
                            disfrutar de todo esto y más en Cuevana3! Solo tienes que entrar a cuevana3.be para empezar a ver tus películas favoritas.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PageOne