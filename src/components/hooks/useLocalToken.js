export default function useLocalToken(){       
    const token = localStorage.getItem('localToken');
    return token
} 