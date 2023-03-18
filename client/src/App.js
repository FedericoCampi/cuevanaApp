import { Suspense, lazy } from 'react';
import './scss/app.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/footer/Footer';

const PageOne = lazy(() => import('./components/pageOne/PageOne'));
const MainPage = lazy(() => import('./components/mainPage/MainPage'));
const PageMovie = lazy(() => import('./components/pageMovie/PageMovie'));

const Loader = () => {
    return(
        <div className='spinnerContainer'>
            <div className='spinner'></div>
        </div>  
    )
}

function App() {
    return (
        <Suspense fallback={<Loader/>}>
            <BrowserRouter>
            <div className="App appContainer">
                <Routes>
                    <Route path="/" element={<PageOne/>}/>
                    <Route path="/MainPage" element={<MainPage/>}/>
                    <Route path="/PageMovie" element={<PageMovie/>}/>
                </Routes>
                <Footer/>
            </div>
            </BrowserRouter>
        </Suspense>
    );
}

export default App;

