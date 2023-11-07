
const redirectUri =  process.env.NODE_ENV === 'production' ? "https://felipe-gomes.com/jamming/" : "http://localhost:3000/jamming/";
const clientId = 'eb472ada336146c6a8384cb9a134a9f4';

const AuthSpotify = async () => {   
  localStorage.setItem('access_token', "");
  const generateRandomString = (length) => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
  }

  const codeVerifier = generateRandomString(64);  
  window.localStorage.setItem('code_verifier', codeVerifier);

  const sha256 = async (plain) => {
    const encoder = new TextEncoder()
    const data = encoder.encode(plain)
    return window.crypto.subtle.digest('SHA-256', data)
  }
  const base64encode = (input) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
  }

  const hashed =  await sha256(codeVerifier);
  const codeChallenge = base64encode(hashed);   

  const scope = 'user-read-private user-read-email playlist-modify-public playlist-modify-private';
  const authUrl = new URL("https://accounts.spotify.com/authorize")

  const params =  {
    response_type: 'code',
    client_id: clientId,
    scope,
    code_challenge_method: 'S256',
    code_challenge: codeChallenge,
    redirect_uri: redirectUri,
  }

  authUrl.search = new URLSearchParams(params).toString();
  window.location.href = authUrl.toString();  
}

const getAccessToken = async (code) => {
  // stored in the previous step
  let codeVerifier = localStorage.getItem('code_verifier');
  let url = 'https://accounts.spotify.com/api/token';

  const payload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
      code_verifier: codeVerifier,
    }),
  }

  const body = await fetch(url, payload);
  const response = await body.json();

  localStorage.setItem('access_token', response.access_token);
  localStorage.setItem('tokenExpiration',  new Date().getTime() + 2600 * 1000);  
  
} 
let access_token = localStorage.getItem('access_token'); 

// Expiration time  
const localExpiration = localStorage.getItem('tokenExpiration'); 
const isAuthorized =  access_token && localExpiration > new Date().getTime(); 
const time = new Date().getTime();


console.log(isAuthorized ? 'Im logged' : 'Logged Out') 
console.log( `
  localExpiration: ${localExpiration} ${new Date(parseInt(localExpiration))} 
  Data atual: ${time} ${new Date(time)}     

`) 

// API
const ApiData = {
  token: access_token,
  url: "https://api.spotify.com/v1/",
  search: "search?q=" 
}

export {AuthSpotify, isAuthorized, ApiData, getAccessToken}