import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import brain from './Logo.png';
const Logo =() =>{
    return(
        <div className='ma4 mt0 center logo'>
            <Tilt className="Tilt br shadow-2" options={{ max : 65 }} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner pa3">
                    <img style={{paddingTop:'10px'}} src={brain} alt='logo' >
                    </img>
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;