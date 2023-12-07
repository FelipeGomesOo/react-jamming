import React, { useState}  from 'react';   
import { Navigate } from 'react-router-dom';  
import useLocalCode from './hooks/useLocalCode'; 
import { getAccessToken } from '../services/PKCE2';
import { useEffect } from 'react';

export default function Main() { 
    const [tokenGranted, setTokenGranted] = useState(false);  
    const code = useLocalCode(); 
    
    useEffect(() => {
        if(code) {
            const grantToken = async () => {
                const token = await getAccessToken(code);
                if(token){
                    setTokenGranted(true);
                } 
              }; 
            grantToken();
        } 
    },[code]) 
    return(
    <>
        {!code && <Navigate to='/login' />}
        {tokenGranted && <Navigate to='/search' />}
    </>
    )
  }  