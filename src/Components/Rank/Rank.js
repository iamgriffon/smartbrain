import React from 'react';
import './Rank.css';

const Rank = ({ name, entries }) => {
    return (
        <div>
            <div className='white f3'>
            <p>{`${name}, your current rank is: `}</p>
            </div>
            <div className='white f3'>
            <p>{`${entries}`}</p>
            </div>
        </div>
    )

}

export default Rank;