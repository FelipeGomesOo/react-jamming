import {useEffect, useState} from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import {getAccessToken} from '../../services/PKCE2';
import useLocalCode from './useLocalCode';

export default function useToken() {   
    const navigate = useNavigate();
    const code = useLocalCode();
    const [token, SetToken] = useState(localStorage.getItem('localToken'));
    //const [refreshToken, SetRefreshToken] = useState(null);
    //const [activeToken, SetActiveToken] = useState(null);
    const [loading, SetLoading] = useState(true);  

    useEffect(() => {
        const handleAuthenticationFlow = async () => {
            if(!code){
                navigate('/login');
            }           
            else{                  
                if(!token){                    
                    const accessData = await getAccessToken(code);                                          
                    if(accessData) {
                        console.log("AccessData returned successfully"); 
                        console.log('Access Token from useAuth:', accessData);
                        SetToken(accessData.token);
                        SetLoading(false); 
                    }
                }
                SetLoading(false);                 
            }
        }         
        handleAuthenticationFlow();
    }, [token, code, navigate]);
 

    return {token, loading} 
}  

