import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import {ConfigContext} from '../services/FetchConfig';
export default function Login({LogInSpotify, isLoggedIn, publicPath}) {

    const config = useContext(ConfigContext);   
 
    if(isLoggedIn) {
        return <Navigate to={publicPath} />
    }  
    return (
        <div className="Login">             
            <h1>Welcome to Jamming</h1>  
            <button onClick={() => LogInSpotify(config.client_id)}>Authorize!</button> 
        </div>
    )    
}