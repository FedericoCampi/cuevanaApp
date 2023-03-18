import { useContext, useState } from 'react';
import { ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import pic from '../../images/cueva-remove.png';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { ContextApi } from '../../context';

function OffCanvas() {

    const { getMoviesByGenre, setMovies, nowPlayingMovies, popularMovies, rankedMovies, 
        getSearchMovies, setSearchKey, searchKey, setColorSection } = useContext(ContextApi);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    var toBillboard = function(ele, numSerie){
        // var right = document.getElementById("#right");
        let offsetTop  = document.getElementById(ele).offsetTop;
        if(numSerie){
            window.scrollTo({
                top: offsetTop-50, 
                behavior: "smooth"
            });
        }else{
            window.scrollTo({
                top: offsetTop, 
                behavior: "smooth"
            });
        }
    }
    const moviesGenre = (e) =>{
        e.preventDefault()
        const idGenre = e.target.id
        getMoviesByGenre(idGenre)
        toBillboard('cartelerMovies')
        handleClose()
    }

    const moviesNow = (e) => {
        e.preventDefault()
        setMovies(nowPlayingMovies)
        setColorSection('nowPlay')
        toBillboard('cartelerMovies')
        handleClose()
    }
    const moviesPop = (e) => {
        e.preventDefault()
        setMovies(popularMovies)
        setColorSection('moreView')
        toBillboard('cartelerMovies')
        handleClose()
    }
    const moviesRanked = (e) => {
        e.preventDefault()
        setMovies(rankedMovies)
        setColorSection('ranked')
        toBillboard('cartelerMovies')
        handleClose()
    }
    const moviesDefault = (e) =>{
        e.preventDefault()
        getSearchMovies()
        setColorSection('lastest')
        toBillboard('cartelerMovies')
        handleClose()
    }
    const searchSeries = (e) =>{
        e.preventDefault()
        toBillboard('cartelerMovies', 2)
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
        handleClose()
        toBillboard('cartelerMovies')
    }
    
    return (
        <>
        <div className='offcanvas_container'id='scrollDiv'>
            <div className="d-lg-none offcanvas_hideItems">
                <Link to='/MainPage'>
                    <img src={pic} alt='cuevana'/>
                </Link>
                <Button variant="primary" className='offcanvas_buttonMenu' onClick={handleShow}>
                    <MenuIcon/>
                </Button>
            </div>
            <div className="d-none d-lg-block offcanvas_containerItems">
                <div className='offcanvas_items'>
                    <div className='offcanvas_img'>
                        <Link to='/MainPage'>
                            <img src={pic} alt='picCueva'/>
                        </Link>
                    </div>
                    <div className='offcanvas_movies'>
                        <Link to='/MainPage'>
                            <Button>Inicio</Button>
                        </Link>
                        <DropdownButton as={ButtonGroup} title="Generos" id="bg-nested-dropdown">
                            <Dropdown.Item eventKey="1" id={28} onClick={moviesGenre}>Acción</Dropdown.Item>
                            <Dropdown.Item eventKey="2" id={12} onClick={moviesGenre}>Aventura</Dropdown.Item>
                            <Dropdown.Item eventKey="3" id={99} onClick={moviesGenre}>Biografía</Dropdown.Item>
                            <Dropdown.Item eventKey="4" id={35} onClick={moviesGenre}>Comedia</Dropdown.Item>
                            <Dropdown.Item eventKey="5" id={99} onClick={moviesGenre}>Documentales</Dropdown.Item>
                            <Dropdown.Item eventKey="6" id={10751} onClick={moviesGenre}>Familiar</Dropdown.Item>
                        </DropdownButton>
                        <DropdownButton as={ButtonGroup} title="Peliculas" id="bg-nested-dropdown">
                            <Dropdown.Item eventKey="1" onClick={moviesNow}>Estrenos</Dropdown.Item>
                            <Dropdown.Item eventKey="2" onClick={moviesPop}>Más vistas</Dropdown.Item>
                            <Dropdown.Item eventKey="3" onClick={moviesRanked}>Ranking</Dropdown.Item>
                            <Dropdown.Item eventKey="4" onClick={moviesDefault}>Peliculas</Dropdown.Item>
                        </DropdownButton>
                        <DropdownButton as={ButtonGroup} title="Series" id="bg-nested-dropdown">
                            <Dropdown.Item eventKey="1" onClick={searchSeries}>Ranking</Dropdown.Item>
                            <Dropdown.Item eventKey="2" onClick={searchSeries}>Todas</Dropdown.Item>
                        </DropdownButton>
                    </div>
                    <div className='offcanvas_buscRegis'>
                        <form className='offcanvas_buscador' onSubmit={enviarDatos}>   
                            <input onChange={handleInputChange} name="key" type="text" placeholder="Buscar peliculas.."></input>
                            <button type='submit'>
                                <SearchIcon  className='offcanvas_SearchIcon'/>
                            </button>
                        </form> 
                        <Button className='offcanvas_butonEntrar'>Entrar</Button>
                        <Button className='offcanvas_butonRegis'>Registro</Button>
                    </div>
                </div>
            </div>
            <Offcanvas show={show} onHide={handleClose} responsive="lg" className='hide_mobile'style={{width:'325px'}}>
                <Offcanvas.Header className='hide_header'>
                    <Link to='/MainPage'>
                        <img src={pic} alt='picCueva'/>
                    </Link>
                </Offcanvas.Header>
                <Offcanvas.Body>
                <div className="mb-0 d-lg-none hide_Body_container">
                    <form className='hide_searcher' onSubmit={enviarDatos}>   
                        <input onChange={handleInputChange} name="key" type="text" placeholder="Buscar peliculas.."></input>
                        <button type='submit'>
                            <SearchIcon className='offcanvas_SearchIcon'/>
                        </button>
                    </form>
                    <div className='hide_buttons'>
                        <Button>Entrar</Button>
                        <Button>Registro</Button>
                    </div>
                </div>
                <div className='d-lg-none hide_categories'>
                    <div className='hide_categories_Inicio'>
                        <button onClick={handleClose}>Inicio</button>
                    </div>
                    <div className='hide_categories_line'></div>
                    <div className= 'hide_categories_genres'>
                        <p>Géneros</p>
                        <div className= 'hide_categories_lists'>
                            <div className= 'hide_categories_list'>
                                <ul>
                                    <button id={28} onClick={moviesGenre}>Acción</button>
                                    <button id={12} onClick={moviesGenre}>Aventura</button>
                                    <button id={99} onClick={moviesGenre}>Biografía</button>
                                    <button id={35} onClick={moviesGenre}>Comedia</button>
                                    <button id={99} onClick={moviesGenre}>Documentales</button>
                                    <button id={10751} onClick={moviesGenre}>Familiar</button>
                                </ul>
                            </div>
                            <div className= 'hide_categories_list'>
                                <ul>
                                    <button id={16} onClick={moviesGenre}>Animadas</button>
                                    <button id={80} onClick={moviesGenre}>Crimen</button>
                                    <button id={18} onClick={moviesGenre}>Drama</button>
                                    <button id={14} onClick={moviesGenre}>Fantasía</button>
                                    <button id={27} onClick={moviesGenre}>Horror</button>
                                    <button id={10752} onClick={moviesGenre}>Guerra</button>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='hide_categories_line'></div>
                    <div className= 'hide_categories_genres'>
                        <p>Películas</p>
                        <div className= 'hide_categories_lists'>
                            <div className= 'hide_categories_list'>
                                <ul>
                                    <button onClick={moviesNow}>Estrenos</button>
                                    <button onClick={moviesPop}>Más vistas</button>
                                </ul>
                            </div>
                            <div className= 'hide_categories_list'>
                                <ul>
                                    <button onClick={moviesRanked}>Ranking</button>
                                    <button onClick={moviesDefault}>Películas</button>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    </>
);
}

export default OffCanvas;