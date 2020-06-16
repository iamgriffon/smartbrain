import React from 'react';
import './facerecon.css';

const FaceRecon = ({imageUrl, box}) => {
    return(
        <div className='center ma'>
            <div className='absolute mt2'>
            <img src={imageUrl} id='inputimage' alt='' width='450px' height='auto'/>
            <div className='bounding-box' style={{top: box.topRow, bottom: box.bottomRow, right: box.rightCol, left: box.leftCol}}></div>
        </div>
    </div>
    );
}

export default FaceRecon;