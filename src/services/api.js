 import React from "react";
 import { v4 as uuidv4 } from 'uuid';

// Authorization Request 

const LogInSpotify = () => {
    const client_id = 'b15d5ae100e74e55995ef88dbb928971';
    const redirect_uri = 'http://localhost:3000/';
    const scope = 'user-read-private user-read-email playlist-modify-public playlist-modify-private';

    const state = uuidv4(16);
    localStorage.setItem('tokenState', state); 
    localStorage.setItem('tokenAccess', "")
    localStorage.setItem('tokenExpiration', "")        

    let url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(client_id);
    url += '&scope=' + encodeURIComponent(scope);
    url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
    url += '&state=' + encodeURIComponent(state);

    window.location.href = url;
     
};

// Access Token  

const urlParams = new URLSearchParams(window.location.href);
const token = {
    access: urlParams.get("http://localhost:3000/#access_token"),
    type: urlParams.get("token_type"),
    expiration: new Date().getTime() + (parseInt(urlParams.get("expires_in")) * 1000),
    state: urlParams.get("state")
}

// Store Token and Expiration
if(localStorage.tokenState === token.state){
    if(localStorage.tokenAccess === ""){
        localStorage.setItem('tokenAccess', token.access); 
        localStorage.setItem('tokenExpiration', token.expiration);  
    }
} 

// Local Token and Expiration time 
const localToken = localStorage.getItem('tokenAccess');
const localExpiration = localStorage.getItem('tokenExpiration'); 

const isLoggedIn =  localExpiration > new Date().getTime(); 
const time = new Date().getTime();

console.log(isLoggedIn ? 'Im logged' : 'Logged Out') 
console.log( `

  localToken: ${localToken}
  token.access: ${token.access}

  localStorage.tokenState: ${localStorage.tokenState}
  token.state: ${token.state}

  localExpiration: ${localExpiration} ${new Date(parseInt(localExpiration))} 
  Data atual: ${time} ${new Date(time)}     

`) 



// API
const ApiData = {
    token: localToken,
    url: "https://api.spotify.com/v1/",
    search: "search?q=" 
}


export {LogInSpotify, isLoggedIn, ApiData}