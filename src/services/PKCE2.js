const redirectUri =  process.env.NODE_ENV === 'production' ? "https://felipe-gomes.com/jamming/" : "http://localhost:3000/jamming/";
const clientId = 'eb472ada336146c6a8384cb9a134a9f4';

export async function redirectToAuthCodeFlow() {
    localStorage.clear();
    const verifier = generateCodeVerifier(64);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", redirectUri);
    params.append("scope", 'user-read-private user-read-email playlist-modify-public playlist-modify-private');
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

function generateCodeVerifier(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function generateCodeChallenge(codeVerifier) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}


export async function getAccessToken(code) {
    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", redirectUri);
    params.append("code_verifier", verifier); 
    try {
        const response = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: params
        })
        if(response.ok){
            const tokenData = await response.json();
            localStorage.setItem("access_token", tokenData.access_token); 
            console.log(`Token from server: ${tokenData.access_token}`)   
            return tokenData.access_token;           
        }else{
            const errorData = await response.json();
            console.log("Error getting token:", errorData);
            return null; 
        }
    }   catch (error) {
        console.log(`Get access token error: ${error}`);
    }    
}

const verifier = localStorage.getItem("verifier");