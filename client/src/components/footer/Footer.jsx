import React from 'react'
import imageFooter from '../../images/cuevanaFooter.png';
import tw from '../../images/icons/twitter.png';
import fb from '../../images/icons/facebook.png';

const Footer = () => {
    return (
        <div className='footer_container'>
            <img src={imageFooter} alt='cuevana footer'/>
            <p>&copy; 2023 Todos los derechos reservados.</p>
            <div className='footer_developed'>
                <p>Developed by Federico Campi</p>
            </div>
            <div className='footer_icons'>
                <img src={tw} alt='twitter'/>
                <img src={fb} alt='facebook'/>
            </div>
        </div>
    )
}

export default Footer