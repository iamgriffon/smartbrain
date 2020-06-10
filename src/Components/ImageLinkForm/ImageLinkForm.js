import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onSubmit }) => {
    return (
        <div className='f3'>
            <p>{'Hello, my name is SmartBrain, I will detect faces in your pictures, Try Me!'}</p>
            <div className='center'>
                <div className='pa4 br3 shadow-3 center form'>
                <input className='f4 pa2 w-70 center' type='text' onChange={onInputChange}/>
                <button className='w-30 grow f4 link dib ph3 pv2 white bg-light-purple' onClick={onSubmit}>Detect</button>
                </div>
            </div>
        </div>
    )

}

export default ImageLinkForm;