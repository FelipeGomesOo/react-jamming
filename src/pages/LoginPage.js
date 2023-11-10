import React from 'react';  
import { redirectToAuthCodeFlow} from '../services/PKCE2'; 
export default function LoginPage() {     
    return (
        <div className="Login">             
            <h1>Welcome to Jamming</h1>  
            <button onClick={() => redirectToAuthCodeFlow()}>Authorize!</button> 
        </div>
    )    
}