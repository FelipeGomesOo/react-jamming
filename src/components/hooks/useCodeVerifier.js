export default function useLocalVerifier(){       
    const codeVerifier = localStorage.getItem('code_verifier');
    return codeVerifier
} 