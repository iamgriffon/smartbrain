import React from 'react';

const Navigation =({onRouteChange, loggedin}) =>{
        if (loggedin) {
            return(
                <nav style={{ display: 'flex', justifyContent:'flex-end' }}>
                    <p onClick={() => { onRouteChange('notlogged')}} className='f3 link dim black b underline pa3 pointer'> Sign Out </p>
                </nav>)} 
                
        else {
            return( 
                <div>
                    <nav style={{ display: 'flex', justifyContent:'flex-end' }}>
                        <p onClick={() => { onRouteChange('notlogged')}} className='f3 link dim black b underline pa3 pointer'> Sign In </p>
                        <p onClick={() => { onRouteChange('register')}} className='f3 link dim black b underline pa3 pointer'> Register </p>
                    </nav>
                </div>
                )} 
        }
   

export default Navigation