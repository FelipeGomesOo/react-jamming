import React from 'react';

export default function Login({LogInSpotify}) {
    return (
        <div className="Login">
            <h1>Welcome to Jamming</h1>  
            <a href='#' onClick={() => LogInSpotify()}>Authorize!</a> 
        </div>
    )    
}