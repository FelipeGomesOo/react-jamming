import React, {  useState}  from 'react';   
import { Navigate } from 'react-router-dom';    
import { getAccessToken } from '../services/PKCE2'; 
import useLocalCode from '../components/hooks/useLocalCode'; 
import useCodeVerifier from '../components/hooks/useCodeVerifier';

export default function RequestTokenPage() {
    const [tokenIsSet, setTokenisSet] = useState(false);
    const code = useLocalCode(); 
    const codeVerifier = useCodeVerifier(); 

    const handleRequestToken = async () => {
        const token = await getAccessToken(code, codeVerifier)
        setTokenisSet(token);
    }  
     
    return (
       
        <div className="RequestToken"> 
         {tokenIsSet && <Navigate to='/search' />}            
            <div>
                <h1>Thank you! Now we need to request and API Token</h1>  
                <p>Please click the button to request a new token from your Spotify account</p>
                <button onClick={() => handleRequestToken()}>Get token</button> 
            </div>
        </div>
    )    
}