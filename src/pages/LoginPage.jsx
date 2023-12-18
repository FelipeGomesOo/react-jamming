import React from 'react';  
import { redirectToAuthCodeFlow} from '../services/PKCE2'; 
export default function LoginPage() {     
    return (
        <div className="Login">             
            <div>
                <h1>Welcome to Jamming</h1>  
                <p>Please authorize Jamming to access your Spotify account</p>
                <button onClick={() => redirectToAuthCodeFlow()}>Authorize</button> 
            </div>
        </div>
    )    
}