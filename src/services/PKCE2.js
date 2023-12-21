const redirectUri =  process.env.NODE_ENV === 'production' ? "https://felipe-gomes.com/jamming/" : "http://localhost:3000/jamming/";
const clientId = 'eb472ada336146c6a8384cb9a134a9f4';
const localToken = localStorage.getItem('localToken'); 

export async function redirectToAuthCodeFlow() { 
    const verifier = generateCodeVerifier(64);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("code_verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", redirectUri);
    params.append("scope", 'user-read-private user-read-email playlist-modify-public playlist-modify-private playlist-read-private playlist-read-collaborative');
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

const code_verifier = localStorage.getItem("code_verifier");

export async function getAccessToken(code) { 
   if(!localToken) {
        console.log("GetAccess Token Init");
        const url = "https://accounts.spotify.com/api/token";
        const payload = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                client_id: clientId,
                grant_type: 'authorization_code', code,
                redirect_uri: redirectUri,
                code_verifier: code_verifier
            }),
        }
        try{
            const response = await fetch(url, payload)
            if(response.ok){ 
                console.log("Response is good");
                const data = await response.json(); 
                const accessData = {
                    token: data.access_token,
                    freshToken: data.refresh_token,
                    exp: data.expires_in
                }
                localStorage.setItem("localToken", accessData.token);  
                console.log("Access data", accessData)              
                return accessData;           
            }else{
                console.log("Response is bad");
                const errorData = await response.json();
                console.log("Error getting acces data:", errorData);
                console.log("Code passed:", code)
                return null; 
            }
        }
        catch(error){ 
            console.log("Error on getAccessToken:", error);
            console.log("Code passed:", code);
        }
        
    }else {
        console.log("We already have the token")
        return localToken;
    }   
}