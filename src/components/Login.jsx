import React from 'react';
import { Navigate } from 'react-router-dom';

export default function Login({LogInSpotify, isLoggedIn}) {
    if (isLoggedIn) {
        return <Navigate to="/" />
    } 
    return (
        <div className="Login">
            <h1>Welcome to Jamming</h1>  
            <a href="#" onClick={() => LogInSpotify()}>Authorize!</a> 
        </div>
    )    
}