import React from 'react';  
export default function Login({redirectToAuthCodeFlow}) {     
    return (
        <div className="Login">             
            <h1>Welcome to Jamming</h1>  
            <button onClick={() => redirectToAuthCodeFlow()}>Authorize!</button> 
        </div>
    )    
}