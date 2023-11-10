export default function useLocalCode(){
    const urlCode = new URLSearchParams(window.location.search).get("code");
    urlCode && localStorage.setItem('API_CODE', urlCode);    
    const code = localStorage.getItem('API_CODE');

    return code
} 