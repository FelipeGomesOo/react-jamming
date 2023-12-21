export default function useLocalToken(){       
    const token = localStorage.getItem('localToken');
    if(token) {
        return token;
    }else {
        return null;
    }
} 