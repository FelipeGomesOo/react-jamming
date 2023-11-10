import {useEffect, useState} from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import {getAccessToken} from '../../services/PKCE2';
import useLocalCode from './useLocalCode';

export default function useToken() {   
    const navigate = useNavigate();
    const code = useLocalCode();
    const [token, SetToken] = useState(localStorage.getItem('access_token'));
    const [refreshToken, SetRefreshTokentToken] = useState(null);
    const [activeToken, SetActiveToken] = useState(null);

    useEffect(() => {
        const handleAuthenticationFlow = async () => {
            if(!code){
                navigate('/login');
            }           
            else{  
                if(!token){
                    try { 
                        const accessToken = await getAccessToken(code);
                        if(accessToken) {
                            console.log(`Access Token from useAuth: ${accessToken}`) 
                            SetToken(accessToken);
                        }                   
                    } catch(error) { 
                        console.error('Error obtainign acces token', error);
                    }
                }
            }
        }         
        handleAuthenticationFlow();
    }, [token, code, navigate]);
    
    return token
}  

