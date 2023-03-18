import React from 'react';
import CarouselReact from '../carousel/Carousel';
import Carteler from '../carteler/Carteler';
import OffCanvas from '../offCanvas/OffCanvas';

const MainPage = () => {

return (
    <>
        <div className='main_container'>
            <div className='main_header'>
                <OffCanvas/>
                <CarouselReact/>
                <Carteler/>
            </div>
        </div>
        
    </>
)
}

export default MainPage